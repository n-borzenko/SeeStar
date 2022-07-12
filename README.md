# <img src="https://see-star.nborzenko.me/assets/logo.svg" width="28" height="28"> SeeStar

The project is located at <https://see-star.nborzenko.me/>.

## About

The main purpose of this application is to provide an easy way to explore information about movies, shows and people.

Information is provided by [The Movie Database API](https://www.themoviedb.org/).

## Tech stack

1. Project is created with [Next.js](https://nextjs.org/)
2. Main language is [TypeScript](https://www.typescriptlang.org/)
3. UI is based on [Tailwind CSS](https://tailwindcss.com/)
4. Data fetching is implemented using [SWR React Hooks](https://swr.vercel.app/)

## Installation

Clone the project

```bash
git clone https://github.com/n-borzenko/SeeStar.git
```

In the project folder install dependencies

```bash
yarn install
# or
npm install
```

### API key

Fetching data requires an API key and it's not secure to store such information in a public repository. You can either explore the production version accessible at <https://see-star.nborzenko.me/> or retrieve your own API key. You need to have an account on [The Movie Database](https://www.themoviedb.org/) and make a request to get API key.

If you have one, you should:

1. Copy `.env.local.example` file to project root directory
2. Rename it to `.env.local`
3. Fill with your personal API Key (v3 auth) retrieved from [api settings](https://www.themoviedb.org/settings/api)

## Local launch

Run project locally

```bash
yarn dev
# or
npm run dev
```

Check out the website at <http://localhost:3000/>
