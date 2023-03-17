# Internz
Internz is a dynamic online platform designed to connect students with valuable internship opportunities. By showcasing a wide range of internships posted by companies across various industries

## Running the React App
1. Install dependencies project dependencies.
```
pnpm install
```
2. Start the development server.
```
pnpm run dev
```

## Setting up Firebase
1. Go to the Firebase Console (https://console.firebase.google.com/) and create a new project.
1. Enable the following services in your Firebase project:
    - Cloud Firestore
    - Cloud Storage
    - Authentication (Email and Password, Google Auth)


## Configuring Firebase in the React App
1. Create a `.env.local` file in the root of your project.
2. Add the following Firebase configuration variables to the `.env.local` file, replacing the empty values with your own Firebase project's credentials:
```
VITE_FIREBASE_KEY=""
VITE_FIREBASE_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```
