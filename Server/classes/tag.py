class Tag:
    def __init__(self, messages, name):
        self.messages = messages
        self.name = name

    def update(self, message):
        self.messages.append(message)
