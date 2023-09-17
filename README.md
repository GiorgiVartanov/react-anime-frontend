<h1 align="center">Anime Searching Website</h1>

<div align="center">
  <h3>
    <a href="https://animepx.netlify.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/GiorgiVartanov/react-anime-frontend">
      Frontend Code
    </a>
    <span> | </span>
    <a href="https://github.com/GiorgiVartanov/react-anime-backend">
      Backend Code
    </a>
  </h3>
</div>

## Table of Contents

- [Features](#features)
- [Tools](#tools)
- [Deploy](#deploy)
- [Run Locally](#run_locally)
- [Notices](#notices)

## Features

### Anime Search and Information

- Search for anime by name, genre, and sorting options
- Access detailed information, similar anime recommendations, and trailers for each anime
- Explore information about producing studios, characters, and voice actors

### User Profiles

- Create or log in to user accounts
- Leave comments for anime <span style="opacity: 0.5;"> (requires login) </span>
- Add anime to favorites<span style="opacity: 0.5;"> (requires login) </span>
- Follow other users <span style="opacity: 0.5;"> (requires login) </span>
- Change account settings, including password, email, username, and profile picture <span style="opacity: 0.5;"> (requires login) </span>

### Admin Dashboard <span style="opacity: 0.5;"> (Admin Only) </span>

- Access an admin dashboard with user management capabilities
- Demote or promote user roles
- Delete user accounts
- Delete comments

### Other

- Switch between light and dark themes.

## Tools

- <a href="https://react.dev"> React </a> <span style="opacity: 0.5;"> Library for building user interfaces </span>
- <a href="https://reactrouter.com"> React Router </a> <span style="opacity: 0.5;"> Routing </span>
- <a href="https://zustand-demo.pmnd.rs/"> Zustand </a> <span style="opacity: 0.5;"> Global state management </span>
- <a href="https://www.typescriptlang.org/">Typescript</a> <span style="opacity: 0.5;"> JavaScript's superset with types </span>
- <a href="https://axios-http.com/docs/intro">Axios</a> <span style="opacity: 0.5;"> HTTP client </span>
- <a href="https://www.typescriptlang.org/">React Query</a> <span style="opacity: 0.5;"> Data fetching and state management </span>
- <a href="https://fkhadra.github.io/react-toastify/introduction"> React Toastify </a> <span style="opacity: 0.5;"> toasts </span>
- <a href="https://tailwindcss.com"> TailwindCSS </a> <span style="opacity: 0.5;"> CSS framework with prebuilt styles </span>
- <a href="https://www.framer.com/motion/"> Framer Motion </a> <span style="opacity: 0.5;"> Animation library </span>
- <a href="https://jikan.moe/"> Jikan.moe </a> <span style="opacity: 0.5;"> API </span>

## Deploy

- <a href="https://www.netlify.com">Netlify</a> <span style="opacity: 0.5;"> Frontend </span>
- <a href="https://render.com">Render</a> <span style="opacity: 0.5;"> Backend </span>

## Run_Locally

### Frontend

```
 git clone https://github.com/GiorgiVartanov/react-anime-frontend
 cd react-anime-frontend
 npm i
 npm run dev
```

### Backend

```
git clone https://github.com/GiorgiVartanov/react-anime-backend
cd react-anime-backend
npm i

// add .env file with

// NODE_ENV = development
// PORT = 5000
// MONGO_URI = mongodb+srv://admin:admin@vite-anime.08auhsc.mongodb.net/app?retryWrites=true&w=majority
// JWT_SECRET = verysecretkey
// FRONTEND_URL = http://localhost:5173
// API_URL = https://api.jikan.moe/v4

npm run dev
```

## Notices

\* The initial request to the backend may take around 1-2 minutes due to the use of the free tier of <a href="https://render.com">Render</a> for hosting.

\* If the backend won't response in 1-2 minutes you can [Run it Locally](#run_locally)
