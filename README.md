# SocialMediaApp
Documentation url : https://documenter.getpostman.com/view/24639198/2s93zGzdvg

User API Documentation
#Sign Up
Endpoint: POST /SignUp

Create a new user. Request body (form-data) should include the following parameters: name, email, password, repeat_password, and a path to add photo.

Example request body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "repeat_password": "password123",
  "photo": <path-to-photo>
}

# Sign In
Endpoint: POST /SignIn

Sign in user. Request body should include the following parameters: email and password.

Example request body:
{
  "email": "johndoe@example.com",
  "password": "password123"
}

# Reset Password
Endpoint: PUT /Reset

Reset user's password. Request body should include the following parameter: email.

Example request body:
{
  "email": "johndoe@example.com"
}

# Get User Data
Endpoint: POST /GetUser

Get user's data. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>

# Update Password
Endpoint: PATCH /UpdatePassword

Update user's password. Request body should include the following parameters: oldPass, newpass, and Cpass. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>

Example request body:
{
  "oldPass": "123456",
  "newpass": "1235467",
  "Cpass": "1235467"
}

# Update Info
Endpoint: PUT /UpdateInfo

Update user's info. Request body should include the following parameters: name and age. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "name": "John Doe",
  "age": 30
}

# Posts
# Add Post
Endpoint: POST /posts

Add a new post. Request body should include the following parameters: Title and text. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>

Example request body:
{
  "Title": "My First Post",
  "text": "This is my first post on this platform!"
}

# Add Comment
Endpoint: PATCH /comments

Add a new comment. Request body should include the following parameters: comment and post. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "comment": "Great post, thanks for sharing!",
  "post": "ID Post"
}

# Delete Comment
Endpoint: DELETE /comments

Delete a comment. Request body should include the following parameters: Id and post. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "Id": "23456",
  "post": "12345"
}

# Update Comment
Endpoint: PUT /comments

Update a comment. Request body should include the following parameters: IdPost, IdComment and comment. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "IdPost": "64a6e54c66aacd3a8135fcd4",
  "IdComment": "64a6e55c66aacd3a8135fcd6",
  "comment": "Thanks for sharing!"
}

# change to Privacy Post
Endpoint: PUT /privacy

Update privacy settings for a post. Request body should include the following parameters: post and Id. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "post": "64286d8609bbe5ed181bd7cc",
  "Id": "6428312e73be852c69694b4c"
}

# Get Privacy Post
Endpoint: POST /get-privacy

Get privacy settings for a post. Request body should include the following parameters: post and Id. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token> 
Example request body:
{
  "post": "64286038e667b1312597ab82",
  "Id": "6428312e73be852c69694b4c"
}

# Public Post
Endpoint: PUT /public

Update privacy settings for a post to public. Request body should include the following parameters: post and Id. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "post": "64286038e667b1312597ab82",
  "Id": "6428312e73be852c69694b4c"
}

# Delete Post
Endpoint: DELETE /posts

Delete a post. Request body should include the following parameter: postId. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "postId": "64286038e667b1312597ab82"
}

# Get Posts
Endpoint: GET /posts

Get all posts made by the user. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>

# Update Post
Endpoint: PATCH /posts

Update a post. Request body should include the following parameters: postId, text, and Title. The Bearer Token authorization header is required with the user's access token.

Example request headers:

Authorization: Bearer <user-access-token>
Example request body:
{
  "postId": "12345",
  "text": "This is my updated post.",
  "Title": "My Updated Post Title"
}

# Like
Endpoint: PUT /like

Like a post. Request body should include the following parameter: postId. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "postId": "642830ad73be852c69694b3a"
}

# Dislike
Endpoint: PUT /dislike

Dislike a post. Request body should include the following parameter: postId. The Bearer Token authorization header is required with the user's access token.

Example request headers:
Authorization: Bearer <user-access-token>
Example request body:
{
  "postId": "642830ad73be852c69694b3a"
}




