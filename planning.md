# P3

## Collaborators
Efrain Encarnacion, Christopher Bowman

## User Story
A reverse engineering of instagram for having a user profile, following other users, posting pictures, commenting on posts.

## Component Hierarchy
 - App
    - Add User
      - Home
      - Search
      - Profile
        - UserPost
        - UserFollowing


## Wire Frame
![Wireframe](https://imgur.com/iN8atQD.jpg)

## Sudo Code
1. Add User page - User will sign up and create and account and then be able to login to user profile here.
```bash
  - Create User "POST"
  - authentication
```
2. Home page - Displays posts from users the profile user is following.
```bash
  - Show UserPost of UserFollowing "GET"
  - Show Users "GET" (if not following someone)
  - Create UserFollowing from Users "POST" (if not following someone)
```
3. Profile pages - Displays profiles of other users and their posts.
```bash
  - Show User "GET"
  - Index UserPost "GET"
  - Destroy UserFollowing "DELETE"
```
4. User Profile page - Displays user posts and has allows user to post/edit posts.
```bash
  - Update User "PUT"
  - Destroy User "DELETE"
    - Create UserPost "POST"
    - Index UserPost "GET"
      - Show UserPost "GET"
    - Update UserPost "PUT"
    - Destroy UserPost "DELETE"
```
5. Search page - Allows user to search for other users to follow with username.
```bash
  - Index Users "GET"
  - Create UserFollowing from Users "POST"
```
6. Following page (linked from user profile page) - Displays users the profile user is following without displaying user posts.
```bash
  - Index UserFollowing "GET"
  - Destroy UserFollowing "DELETE"
```
7. Schemas
```bash
  - User
      {userName: String unique,
      userImg: String,}

  - UserFollowing 
      {userFollowing: [Strings]}

  - UserPost
      {caption: String,
      Image: String,
      comments: [Strings]}
```

## Stretch Goals
- Add followers
- Like UserPosts
- Authentication
- Websockets
