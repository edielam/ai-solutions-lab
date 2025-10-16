import { neon } from "@neondatabase/serverless"

let sql: any

if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") {
  sql = neon(process.env.DATABASE_URL)
} else {
  console.warn("⚠️ DATABASE_URL not set — using mock SQL function for CI/CD build.")
  sql = async () => [] // mock fallback to avoid crashes
}

export interface Business {
  id: string
  name: string
  industry?: string
  description?: string
  website?: string
  phone?: string
  email?: string
  logo_url?: string
  banner_url?: string
  primary_color: string
  secondary_color: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  business_id: string
  name: string
  type: string
  content?: string
  file_url?: string
  size?: number
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  business_id: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  sender: "user" | "assistant"
  content: string
  message_type: string
  metadata?: any
  created_at: string
}

export interface Appointment {
  id: string
  business_id: string
  conversation_id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  service_type?: string
  appointment_date: string
  appointment_time: string
  duration: number
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface AIMetrics {
  id: string
  business_id: string
  conversation_id?: string
  session_id: string
  
  // Performance metrics
  response_time_ms: number
  success_rate: number
  
  // AI performance metrics
  tokens_used: number
  prompt_tokens?: number
  completion_tokens?: number
  api_cost_usd: number
  model_name: string
  
  // Business metrics
  intent_detected: string
  appointment_requested: boolean
  human_handoff_requested: boolean
  appointment_booked?: boolean
  
  // Message metrics
  user_message_length: number
  ai_response_length: number
  response_type: string
  
  created_at: string
}

// Business operations
export async function createBusiness(business: Omit<Business, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO businesses (name, industry, description, website, phone, email, logo_url, banner_url, primary_color, secondary_color)
    VALUES (${business.name}, ${business.industry}, ${business.description}, ${business.website}, ${business.phone}, ${business.email}, ${business.logo_url}, ${business.banner_url}, ${business.primary_color}, ${business.secondary_color})
    RETURNING *
  `
  return result[0] as Business
}

export async function getBusiness(id: string) {
  const result = await sql`SELECT * FROM businesses WHERE id = ${id}`
  return result[0] as Business | undefined
}

export async function updateBusiness(id: string, updates: Partial<Business>) {
  const setClause = Object.keys(updates)
    .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
    .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
    .join(", ")

  if (!setClause) return null

  const values = [
    id,
    ...Object.values(updates).filter((_, index) => {
      const key = Object.keys(updates)[index]
      return key !== "id" && key !== "created_at" && key !== "updated_at"
    }),
  ]

  const result = await sql`
    UPDATE businesses 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Business | undefined
}

// Document operations
export async function createDocument(document: Omit<Document, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO documents (business_id, name, type, content, file_url, size)
    VALUES (${document.business_id}, ${document.name}, ${document.type}, ${document.content}, ${document.file_url}, ${document.size})
    RETURNING *
  `
  return result[0] as Document
}

export async function getDocumentsByBusiness(businessId: string) {
  const result = await sql`SELECT * FROM documents WHERE business_id = ${businessId} ORDER BY created_at DESC`
  return result as Document[]
}

export async function deleteDocument(id: string) {
  await sql`DELETE FROM documents WHERE id = ${id}`
}

// Conversation operations
export async function createConversation(conversation: Omit<Conversation, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO conversations (business_id, customer_name, customer_email, customer_phone, status)
    VALUES (${conversation.business_id}, ${conversation.customer_name}, ${conversation.customer_email}, ${conversation.customer_phone}, ${conversation.status || "active"})
    RETURNING *
  `
  return result[0] as Conversation
}

export async function getConversation(id: string) {
  const result = await sql`SELECT * FROM conversations WHERE id = ${id}`
  return result[0] as Conversation | undefined
}

export async function getConversationsByBusiness(businessId: string) {
  const result = await sql`SELECT * FROM conversations WHERE business_id = ${businessId} ORDER BY updated_at DESC`
  return result as Conversation[]
}

export async function updateConversation(id: string, updates: Partial<Conversation>) {
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => 
      key !== "id" && key !== "created_at" && key !== "updated_at"
    )
  )

  if (Object.keys(filteredUpdates).length === 0) return null

  // Build the query dynamically using proper sql template literals
  let query = sql`UPDATE conversations SET updated_at = NOW()`
  
  for (const [key, value] of Object.entries(filteredUpdates)) {
    query = sql`${query}, ${sql.unsafe(key)} = ${value}`
  }
  
  query = sql`${query} WHERE id = ${id} RETURNING *`

  const result = await query
  return result[0] as Conversation | undefined
}

// Message operations
export async function createMessage(message: Omit<Message, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO messages (conversation_id, sender, content, message_type, metadata)
    VALUES (${message.conversation_id}, ${message.sender}, ${message.content}, ${message.message_type || "text"}, ${JSON.stringify(message.metadata || {})})
    RETURNING *
  `

  // Update conversation timestamp
  await sql`UPDATE conversations SET updated_at = NOW() WHERE id = ${message.conversation_id}`

  return result[0] as Message
}

export async function getMessagesByConversation(conversationId: string) {
  const result = await sql`SELECT * FROM messages WHERE conversation_id = ${conversationId} ORDER BY created_at ASC`
  return result as Message[]
}

// Appointment operations
export async function createAppointment(appointment: Omit<Appointment, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO appointments (business_id, conversation_id, customer_name, customer_email, customer_phone, service_type, appointment_date, appointment_time, duration, status, notes)
    VALUES (${appointment.business_id}, ${appointment.conversation_id}, ${appointment.customer_name}, ${appointment.customer_email}, ${appointment.customer_phone}, ${appointment.service_type}, ${appointment.appointment_date}, ${appointment.appointment_time}, ${appointment.duration || 60}, ${appointment.status || "scheduled"}, ${appointment.notes})
    RETURNING *
  `
  return result[0] as Appointment
}

export async function getAppointmentsByBusiness(businessId: string) {
  const result =
    await sql`SELECT * FROM appointments WHERE business_id = ${businessId} ORDER BY appointment_date DESC, appointment_time DESC`
  return result as Appointment[]
}

export async function getAppointmentsByConversation(conversationId: string) {
  const result =
    await sql`SELECT * FROM appointments WHERE conversation_id = ${conversationId} AND status != 'cancelled' ORDER BY appointment_date DESC, appointment_time DESC`
  return result as Appointment[]
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  const setClause = Object.keys(updates)
    .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
    .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
    .join(", ")

  if (!setClause) return null

  const values = [
    id,
    ...Object.values(updates).filter((_, index) => {
      const key = Object.keys(updates)[index]
      return key !== "id" && key !== "created_at" && key !== "updated_at"
    }),
  ]

  const result = await sql`
    UPDATE appointments 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Appointment | undefined
}
// AI Metrics operations
export async function createAIMetrics(metrics: Omit<AIMetrics, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO ai_metrics (
      business_id, conversation_id, session_id,
      response_time_ms, success_rate,
      tokens_used, prompt_tokens, completion_tokens, api_cost_usd, model_name,
      intent_detected, appointment_requested, human_handoff_requested, appointment_booked,
      user_message_length, ai_response_length, response_type
    )
    VALUES (
      ${metrics.business_id}, ${metrics.conversation_id}, ${metrics.session_id},
      ${metrics.response_time_ms}, ${metrics.success_rate},
      ${metrics.tokens_used}, ${metrics.prompt_tokens}, ${metrics.completion_tokens}, ${metrics.api_cost_usd}, ${metrics.model_name},
      ${metrics.intent_detected}, ${metrics.appointment_requested}, ${metrics.human_handoff_requested}, ${metrics.appointment_booked || false},
      ${metrics.user_message_length}, ${metrics.ai_response_length}, ${metrics.response_type}
    )
    RETURNING *
  `
  return result[0] as AIMetrics
}

export async function getMetricsByBusiness(businessId: string, limit: number = 100) {
  const result = await sql`
    SELECT * FROM ai_metrics 
    WHERE business_id = ${businessId} 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `
  return result as AIMetrics[]
}

export async function getMetricsAnalytics(businessId: string, days: number = 30) {
  const result = await sql`
    SELECT 
      COUNT(*) as total_conversations,
      AVG(response_time_ms) as avg_response_time_ms,
      AVG(success_rate) as avg_success_rate,
      SUM(tokens_used) as total_tokens_used,
      SUM(api_cost_usd) as total_api_cost_usd,
      COUNT(CASE WHEN appointment_requested = true THEN 1 END) as appointment_requests,
      COUNT(CASE WHEN appointment_booked = true THEN 1 END) as appointments_booked,
      COUNT(CASE WHEN human_handoff_requested = true THEN 1 END) as human_handoffs
    FROM ai_metrics 
    WHERE business_id = ${businessId} 
    AND created_at >= NOW() - INTERVAL '${days} days'
  `
  return result[0]
}