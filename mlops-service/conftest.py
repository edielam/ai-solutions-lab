# Test Configuration (OPTIONAL - tests work without this)
# Lab 3: Testing AI Systems
# This file provides shared test setup but is not required

import pytest
from app import app

@pytest.fixture
def client():
    """Create a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client