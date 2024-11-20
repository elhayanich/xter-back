from pydantic import BaseModel

class FollowRequest(BaseModel):
    follower : int
    followed : int 