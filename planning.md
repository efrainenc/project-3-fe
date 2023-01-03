# P3

# Collaborators
Efrain Encarnacion, Christopher Bowman

# Project Description
A reverse engineering of instagram for posting pictures, commenting, and having a profile.

## User Story 

1. Add User page
```bash
  - Create User "POST"
  - authentication
```
2. Home page
```bash
  - Show UserPost of Followers "GET"
  - Show Users "GET" (if not following someone)
  - Create Followers from Users "POST" (if not following someone)
```
3. Other Users Profile page
```bash
  - Show User "GET"
  - Index UserPost "GET"
  - Destroy Followers "DELETE"
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
  - Create Followers from Users "POST"
```
6. Followers page (linked from profile page)
```bash
  - Index Followers "GET"
  - Destroy Followers "DELETE"
```

## Wire Frame


## Stretch Goals
- Like UserPosts
- Authentication
- Websockets
