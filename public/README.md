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

## Setup
```bash
npm install
npm run dev
```
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
- react-helmet-async peer dependency warning for React 19
- Some WebSocket messages may not update if disconnected

## Future Improvements
- Better offline sync
- More user profile features