
# Classe python
class User:
    def __init__(self, user_name, email, picture_url=None, is_admin=False):
        self.user_name = user_name
        self.email = email
        self.picture_url = picture_url
        self.is_admin = is_admin

