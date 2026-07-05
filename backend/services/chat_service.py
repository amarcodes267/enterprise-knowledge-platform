chat_history = []


def store_message(role, message):
    chat_history.append({
        "role": role,
        "message": message
    })


def get_chat_history():
    return chat_history


def format_chat_history():
    if not chat_history:
        return "No previous conversation."

    formatted_history = ""

    for chat in chat_history:
        role = chat["role"].capitalize()
        message = chat["message"]
        formatted_history += f"{role}: {message}\n\n"

    return formatted_history.strip()