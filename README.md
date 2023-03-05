# Messaging App

**A Fullstack App**

## Menu
- [Description](#description)
- [Technologies (summary)](#technologies-summary)
- [Setup](#setup)


## Description
[Go to menu](#menu)

This app allows the user to send text messages to one user or serveral users (a group), create groups, join groups, and add contacts.

The user must to create an account with email and password.

The app has two sections.\
The left side shows a list of items such as chat, group, users, requests. Each list item can be clicked by the user to change the content on the right side.

### Chat list
This is the default content that the user will see on the left side after loggin in.

Each chat has a user's email, and the last message, but if there is no chat, a message in showed instead.

The user can send messages to another user without being a contact, but to send messages to a group the user needs to be a member of the group.

### Groups

It shows:
- a list of group where the user is a member, but if there is no group, a message in showed instead.
- a button to show a form to create a group

All groups are visible (public) to all users.
If a group does not require a request, users can join it directly.
If a group requires a request, the group creator can accept or reject the request.

### Contacts
Shows a list of users that the user has added to the contact list, but if there is no user, a message in showed instead.

Users are added to the contact list directly, no confirmation is needed, this affects both the user who adds and the user who is added.

### Discover
It shows a list of all groups and another list of all online users.

### Requests
It shows two lists that contain:
- requests that the user sent to join groups, they have a button to cancel the request or view the group profile
- requests that other users sent to join the user's groups

## Details of the App
- If the user logs out, the app only deletes the auth token (jwt) from the localStorage

- The user can't delete its account

- When an account is created, the password is encrypted with bcrypt and then saved in the Database, the email is saved in plain text

- When the user clicks on a button such as create group, add contact, leave group, and other buttons, the user needs to reload the page manually to see the changes

- The client always sends data in json format to the server


## Other details
I consider that the code of both Frontend and Backend can be improved a lot.

## Technologies (summary)
[Go to menu](#menu)

The `front` and `back` folders have a more detailed list.

Frontend:
- React
- Vitest & Testing library
- TypeScript

Backend:
- Express (Node.js)
- Mongoose (MongoDB)
- TypeScript

## Setup
[Go to menu](#menu)

The `front` and `back` folders have the instructions for setting up this project.
