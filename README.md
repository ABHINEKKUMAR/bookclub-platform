# BookClub Platform Frontend

The public reading experience and role-based CMS for the BookClub platform.

## Live Beta

[https://bookclub-platform-dusky.vercel.app](https://bookclub-platform-dusky.vercel.app)

## Features

- Book discovery, details, reservations, and reviews
- Book clubs, meetings, membership, and discussions
- Libraries, articles, reader accounts, and borrowing
- Role-based CMS for catalog, members, content, reviews, loans, and users
- Amazon marketplace importer interface
- Executive analytics dashboard

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set the API URL in `.env.local`:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

## Backend

The Express API is deployed at:

[https://bookclub-api-one.vercel.app/api/status](https://bookclub-api-one.vercel.app/api/status)
