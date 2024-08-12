# MERN Posts Web Application

This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS for styling. The application allows users to create, read, update, and delete posts.

## Features

- Create, Read, Update, and Delete (CRUD) operations for posts.
- Responsive design using Tailwind CSS.
- RESTful API built with Express and Node.js.
- MongoDB for data storage.
- React for a dynamic, single-page frontend application.
- Realtime shown notifications and messages using socketio.

## Technologies Used

- **Frontend:**
  - React-vite
  - Tailwind CSS
  - Axios (for API requests)
  - Shadcn/ui
  - redux-toolkit
  - react-redux
  - lucid-react-icon
  - react-icons
  - hooks
  - socketio-client

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - socketio
  - cludinary
  - multer

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanjay-lgtm/Posts.git
   cd mern-posts-app
   ```

2. Install dependencies:

For the server:
```bash
cd server
npm install
```
For the client:
```bash
cd ../client
npm install
```

### Configuration
1. server:

Create a .env file in the server directory with the following content:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

2.Frontend:

You may need to adjust the API URL in the frontend, typically found in a configuration file or directly in the API service file.

### Running the Application
1. client:
 ```bash
     cd client
    npm run dev
```
This will start the backend server using `nodemon` for hot-reloading.
2. server
```bash
cd ../server
npm start
```




### Screenshots
### Home Page
![home](https://github.com/user-attachments/assets/d7cc1db0-0061-441a-a1cb-63bd449dfc40)


### Create Post

![createpost](https://github.com/user-attachments/assets/897a75bd-a189-41bf-bdc7-065897def560)

### Chat
![chat](https://github.com/user-attachments/assets/a5830533-4d0f-4c37-9939-a54698a990f5)

### Profile
![profile](https://github.com/user-attachments/assets/adb92af4-fb65-4e82-b4ca-bee8d8597bff)

### Signup
![signup](https://github.com/user-attachments/assets/620afc2d-ffb0-4a83-910d-7845723aaf83)





