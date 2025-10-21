## TABELAS



MessageModel
    - id 
    - conversation_id
    - sender_id
    - content
    - media_url
    - type
    - reply_to
    - is_deleted
    - createdAt

StatusMessage
    - id 
    - message_id 
    - user_id 
    - status
    - updatedAt

ConversationModel
    - id 
    - is_group
    - name
    - created_by
    - created_at

ConversationParticipants
    - id 
    - conversation_id
    - user_id
    - joined_at
    - is_admin

TypingEventsModel
    - id 
    - conversation_id 
    - user_id 
    - started_at
    - ended_at


# chat-microservice
