# P3

## Collaborators
Efrain Encarnacion, Christopher Bowman

## Project Description
A reverse engineering of instagram for posting pictures, commenting, and having a profile.

## User Story 

1. Add User page
```bash
  - Create User "POST"
  - authentication
```
2. Home page
```bash
  - Show UserPost of UserFollowing "GET"
  - Show Users "GET" (if not following someone)
  - Create UserFollowing from Users "POST" (if not following someone)
```
3. Other Users Profile page
```bash
  - Show User "GET"
  - Index UserPost "GET"
  - Destroy UserFollowing "DELETE"
```
4. Profile page
```bash
  - Update User "PUT"
  - Destroy User "DELETE"
    - Create UserPost "POST"
    - Index UserPost "GET"
      - Show UserPost "GET"
    - Update UserPost "PUT"
    - Destroy UserPost "DELETE"
```
5. Search page
```bash
  - Index Users "GET"
  - Create UserFollowing from Users "POST"
```
6. Following page (linked from profile page)
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
      {userFollowing: [{userName}]}

  - UserPost
      {caption: String,
      Image: String,
      comments: [String]}
```

## Wire Frame


## Component Hierarchy
 - App
  - Add User
    - Home
    - Search
    - Profile
      - Following

## Stretch Goals
- Add followers
- Like UserPosts
- Authentication
- Websockets
