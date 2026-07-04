chat_history = []

def store_message(role, message):
    chat_history.append({
        "role": role,
        "message": message
    })

def get_chat_history():
    return chat_history