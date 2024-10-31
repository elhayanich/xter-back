class User:
    def __init__(self, username, email, picture_url=None, is_admin=False):
        self.username = username
        self.email = email
        self.picture_url = picture_url
        self.is_admin = is_admin