# React To-Do Application

## Features
- Authentication (register/login/logout/me)
- Todo CRUD (create/read/update/delete)
- Real-time updates (WebSocket)
- Filtering, search, pagination
- Error handling & custom 404
- Responsive and accessible UI (Tailwind, ShadCN, Lucide icons)
- Protected routes
- Offline capabilities (Tanstack Query caching)

## Setup (Local Development)

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:5173` (or the port shown in your terminal).

## Production Build

```bash
# Build optimized static assets for production:
npm run build

# Preview the production build locally (optional, Vite only):
npm run preview
```

Built files will be output to the `dist/` directory (for Vite).

## Deployment

### Deploying to Netlify

1. **Pushed the code to GitHub (or GitLab/Bitbucket).**

2. **Created a Netlify account:**  
   Go to [https://app.netlify.com/](https://app.netlify.com/) and sign in.

3. **Start a new site:**  
   Click “Add new site” > “Import an existing project”.

4. **Connect your Git provider and select your repository.**

5. **Set the build settings:**
   - **Build command:**  
     ```
     npm run build
     ```
   - **Publish directory:**  
     ```
     dist
     ```

6. **(Optional) Add environment variables:**  
   In Netlify dashboard, go to **Site settings > Environment Variables**.

7. **Deploy the site!**

#### ⚠️ Routing Fix for Single-Page Apps

To support client-side routing, add a file named `_redirects` to your `public/` directory:

```
/*    /index.html   200
```

This ensures you don’t get 404 errors on refresh.

---

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production

## Tech Stack
- React 19 (Functional + Hooks)
- React Router
- Tanstack Query & Form
- TailwindCSS
- ShadCN/UI, Lucide React
- Axios for API
- WebSocket API

## Screenshots

*(Insert screenshots here)*

## Known Issues
- `react-helmet-async` peer dependency warning for React 19
- Some WebSocket messages may not update if disconnected

## Future Improvements
- Better offline sync
- More user profile features
