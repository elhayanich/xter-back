class Message:
    def __init__(self, content, date_post, picture_url=None, message_parent=None):
        self.content = content
        self.date_post = date_post
        self.picture_url = picture_url
        self.message_parent = message_parent