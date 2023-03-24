# Internz

Internz is a dynamic online platform designed to connect students with valuable internship opportunities. By showcasing a wide range of internships posted by companies across various industries

## Running the React App

1. Install project dependencies.

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

## Configuring and running backend node server

1. Create a `/backend/node.env.local` and add the following:

```
// Server config
EXPRESS_PORT = <port number>
HTTPS_SSL_KEY_PATH = "/path/to/localhost.key"
HTTPS_SSL_CERT_PATH = "/path/to//localhost.crt"

// API config
FIRESTORE_COLLECTION = <collection path or name>
FUSE_SEARCH_KEYS = "object keys to search in separated by space"
```

2. Get or create self signed (for development only) SSL certificate and place i specified folder.
3. Run server with `node ./backend/index.js`.

## Search full text API reference

- Make a POST request to https://example.com/jobs/search with a header `query: <search term/terms>`
- The response will be in JSON:

```
{
    search: [<array with search results>]
    status: <status codes 200 och 404>
}
```

### Example of a request with fetch

```
const searchFullText = async (searchTerm) => {
  try {
    const response = await fetch("https://localhost:3001/jobs/search", {
      method: "POST",
      headers: {
        query: searchTerm,
        accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });

    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};
```

### Example of a response

```
{
  search: [
    {
      item: {
        test: "Lorem ipsum används ofta som exempeltext inom trycksaksframställning och grafisk design för att visa hur till exempel ett dokument kommer att se ut när väl den riktiga texten är på plats. Lorem ipsum visar hur layout, teckensnitt och typografi samspelar, utan att texten, undermedvetet genom ordens betydelse, ska påverka betraktaren.",
      },
      refIndex: 0,
      score: 0.9238008439156884,
    },
  ],
  status: "200",
}
```
