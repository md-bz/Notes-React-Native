# Notes React Native App

A cross-platform notes application built using Expo and React Native, designed for note-taking on mobile devices. This app communicates with a backend API to store, retrieve, and manage notes securely.

## Features

-   **Cross-platform**: Works on Android, iOS(not tested), and Web.
-   **User Authentication**: Secure storage of user sessions using JWT.
-   **Notes Management**: Create, update,read , and delete notes.
-   **Jwt Storage**: Save JWT securely on device with `expo-secure-store` or `@react-native-async-storage` based on platform.
-   **Error Handling**: Minimal error handling for now.

## Tech Stack

-   **Frontend**: React Native with Expo
-   **Backend**: compilable with [note-nest](https://github.com/md-bz/note-nest)
-   **Navigation**: `expo-router` and `@react-navigation/native`
-   **API Handling**: Fetch API for communication with the backend()

## Prerequisites

-   Node.js and npm installed (using Bun is an option)
-   Backend server up and running (use [note-nest](https://github.com/md-bz/note-nest) or see below for doing it yourself)
-   Backend server API URL (set as `EXPO_PUBLIC_API_URL` in `.env`)

## API Routes

Json backend with routes:\*\*

### Notes Routes

Note needs id,title,content

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/notes`     | Create a new note            |
| GET    | `/notes`     | Retrieve all notes           |
| GET    | `/notes/:id` | Retrieve a single note by ID |
| PATCH  | `/notes/:id` | Update a note by ID          |
| DELETE | `/notes/:id` | Delete a note by ID          |

### Auth Routes

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| POST   | `/auth/signup` | Register a new user (returns JWT)    |
| POST   | `/auth/login`  | Login an existing user (returns JWT) |

## Project Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/notes-react-native.git
    cd notes-react-native
    ```

2. **Install dependencies:**
    ```bash
        npm install
    ```
3. **Set up environment variables: rename .env.example to and add your backend API URL**

4. **have a backend setup and running on specified url**

5. **Start the Expo server:**

    ```bash
        npm start

    ```

## License

This project is open-source and licensed under the MIT License.
