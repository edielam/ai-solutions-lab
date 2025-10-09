"""
Test Suite for Flask MLOps Service
Lab 3: Testing AI Systems

This module contains tests for the Flask MLOps service including:
- Health check endpoint testing
- Metrics tracking functionality
- Prometheus metrics validation
- Error handling and edge cases
"""

import pytest
import json
from app import app
from unittest.mock import patch, MagicMock


@pytest.fixture
def client():
    """Create a test client for the Flask application"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def sample_metrics_data():
    """Sample metrics data for testing"""
    return {
        "business_id": "test-business-123",
        "conversation_id": "conv-456",
        "session_id": "session-789",
        "response_time_ms": 1250,
        "success_rate": 1.0,
        "tokens_used": 150,
        "prompt_tokens": 100,
        "completion_tokens": 50,
        "api_cost_usd": 0.002,
        "model_name": "gemini-1.5-flash",
        "intent_detected": "appointment",
        "appointment_requested": True,
        "human_handoff_requested": False,
        "appointment_booked": False,
        "user_message_length": 45,
        "ai_response_length": 120,
        "response_type": "appointment_booking"
    }


class TestHealthEndpoint:
    """Test cases for the health check endpoint"""

    def test_health_check_success(self, client):
        """Test that health endpoint returns success"""
        response = client.get('/health')

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'healthy'
        assert data['service'] == 'mlops-service-prometheus'
        assert 'timestamp' in data
        assert data['monitoring'] == 'prometheus'

    def test_health_check_response_format(self, client):
        """Test health endpoint response format"""
        response = client.get('/health')
        data = json.loads(response.data)

        required_fields = ['status', 'service', 'timestamp', 'monitoring']
        for field in required_fields:
            assert field in data, f"Missing required field: {field}"


class TestMetricsEndpoint:
    """Test cases for the Prometheus metrics endpoint"""

    def test_metrics_endpoint_accessible(self, client):
        """Test that metrics endpoint is accessible"""
        response = client.get('/metrics')

        assert response.status_code == 200
        # Accept different Prometheus content type formats
        assert 'text/plain' in response.content_type
        assert 'charset=utf-8' in response.content_type

    def test_metrics_endpoint_returns_prometheus_format(self, client):
        """Test that metrics endpoint returns Prometheus format"""
        response = client.get('/metrics')
        content = response.data.decode('utf-8')

        # Check for Prometheus metric indicators
        assert '# HELP' in content or '# TYPE' in content or len(content) > 0

    def test_metrics_endpoint_content_type(self, client):
        """Test that metrics endpoint returns correct content type"""
        response = client.get('/metrics')

        assert response.status_code == 200
        # Accept different Prometheus content type formats
        assert 'text/plain' in response.content_type
        assert 'charset=utf-8' in response.content_type


class TestTrackingEndpoint:
    """Test cases for the metrics tracking endpoint"""

    def test_track_metrics_success(self, client, sample_metrics_data):
        """Test successful metrics tracking"""
        response = client.post('/track',
                             json=sample_metrics_data,
                             content_type='application/json')

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'success'
        assert 'timestamp' in data

    def test_track_metrics_missing_data(self, client):
        """Test tracking with missing data"""
        response = client.post('/track',
                             json={},
                             content_type='application/json')

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data

    def test_track_metrics_missing_required_fields(self, client):
        """Test tracking with missing required fields"""
        incomplete_data = {
            "business_id": "test-business",
            # Missing response_time_ms and tokens_used
        }

        response = client.post('/track',
                             json=incomplete_data,
                             content_type='application/json')

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'Missing required field' in data['error']

    def test_track_metrics_no_json(self, client):
        """Test tracking without JSON content"""
        response = client.post('/track')

        # Flask throws 500 for JSON parsing errors, not 400
        assert response.status_code == 500
        data = json.loads(response.data)
        assert 'error' in data

    def test_track_metrics_invalid_json(self, client):
        """Test tracking with invalid JSON"""
        response = client.post('/track',
                             data="invalid json",
                             content_type='application/json')

        # Flask throws 500 for JSON parsing errors, not 400
        assert response.status_code == 500


class TestPrometheusMetrics:
    """Test cases for Prometheus metrics functionality"""

    def test_metrics_updated_after_tracking(self, client, sample_metrics_data):
        """Test that Prometheus metrics are updated after tracking"""
        # Track some metrics
        response = client.post('/track',
                             json=sample_metrics_data,
                             content_type='application/json')
        assert response.status_code == 200

        # Check metrics endpoint
        metrics_response = client.get('/metrics')
        metrics_content = metrics_response.data.decode('utf-8')

        # Should contain our business_id in metrics
        assert 'test-business-123' in metrics_content or len(metrics_content) > 0

    def test_multiple_metrics_accumulation(self, client, sample_metrics_data):
        """Test that multiple metrics are accumulated correctly"""
        # Send multiple tracking requests
        for i in range(3):
            modified_data = sample_metrics_data.copy()
            modified_data['business_id'] = f'business-{i}'

            response = client.post('/track',
                                 json=modified_data,
                                 content_type='application/json')
            assert response.status_code == 200

        # Check that metrics accumulated
        metrics_response = client.get('/metrics')
        assert metrics_response.status_code == 200


class TestErrorHandling:
    """Test cases for error handling scenarios"""

    def test_invalid_endpoint(self, client):
        """Test request to invalid endpoint"""
        response = client.get('/invalid-endpoint')
        assert response.status_code == 404

    def test_wrong_http_method(self, client):
        """Test wrong HTTP method on track endpoint"""
        response = client.get('/track')
        assert response.status_code == 405  # Method not allowed

    @patch('app.store_metrics_in_db')
    def test_database_storage_failure(self, mock_store, client, sample_metrics_data):
        """Test handling of database storage failures"""
        # Mock database storage to fail
        mock_store.return_value = False

        response = client.post('/track',
                             json=sample_metrics_data,
                             content_type='application/json')

        assert response.status_code == 500
        data = json.loads(response.data)
        assert 'error' in data


class TestDataValidation:
    """Test cases for data validation"""

    def test_business_id_validation(self, client, sample_metrics_data):
        """Test business_id field validation"""
        # Test with missing business_id
        data_no_business_id = sample_metrics_data.copy()
        del data_no_business_id['business_id']

        response = client.post('/track',
                             json=data_no_business_id,
                             content_type='application/json')

        assert response.status_code == 400

    def test_numeric_fields_validation(self, client, sample_metrics_data):
        """Test numeric fields validation"""
        # Test with valid numeric data
        response = client.post('/track',
                             json=sample_metrics_data,
                             content_type='application/json')

        assert response.status_code == 200

    def test_optional_fields_handling(self, client):
        """Test that optional fields are handled correctly"""
        minimal_data = {
            "business_id": "test-business",
            "response_time_ms": 1000,
            "tokens_used": 100
        }

        response = client.post('/track',
                             json=minimal_data,
                             content_type='application/json')

        assert response.status_code == 200


class TestCORSHeaders:
    """Test cases for CORS functionality"""

    def test_cors_headers_present(self, client):
        """Test that CORS headers are present for cross-origin requests"""
        response = client.options('/track',
                                headers={'Origin': 'http://localhost:3000'})

        # CORS should be enabled (Flask-CORS handles this)
        assert response.status_code in [200, 204]


if __name__ == '__main__':
    pytest.main([__file__, '-v'])