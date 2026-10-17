# EduCenter — Frontend

Web app for a learning centre, in Uzbek. One login, three roles, each with its own navigation:

- **Student** — timetable, homework and submissions, attendance, news feed, leaderboard, profile
- **Teacher** — mark attendance, post and check homework, publish news
- **Admin** — manage students, teachers and groups, give coins, see login log and stats

Mobile-first: bottom navigation on phones, sidebar on desktop.

Backend: [EDU-back](https://github.com/barnoevmaha/EDU-back).

## Stack

React 18 + Vite, no UI library — own components and CSS. Small hooks for fetching (`useFetch`)
and persisted state (`useLocalStorage`). Deployed on Vercel (`vercel.json`).

## Run

```bash
npm install
npm run dev              # http://localhost:5173, expects the API on :8000
```
