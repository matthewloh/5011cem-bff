<p align="center">
  <a href="https://5011cem.vercel.app/home">
    <img src="./docs/public/techstack.png" height="100">
    <h3 align="center">Big Data Programming Project - Malaysian COVID-19 Dashboard</h3>
  </a>
</p>

<p align="center">A modern full stack Next.js and Supabase web application that uses <a href="https://fastapi.tiangolo.com/">FastAPI</a> as the API backend, <a href="https://supabase.com/">Supabase</a> as the database, and <a href="https://vercel.com/docs">Vercel</a> for hosting. Frontend designed with <a href="https://recharts.org">Recharts</a> and <a href="https://ui.shadcn.com/charts">Shadcn/ui</a> components</p>
</p>

## Introduction

This is the main branch branch of the repository which is deployed to vercel. It has the FastAPI application removed. The branch model-outputs-saved contains the FastAPI application code and is the full-fledged version of the project, which contains the FastAPI application and machine learning models, which incompatible to be deployed on Vercel. Future enhancements include modifying the FastAPI application and its deployed pickle files to allow for deployment on Vercel or other hosting platforms.

## How It Works

The Python/FastAPI server is mapped into to Next.js app under `/api/`.
This is implemented using [`next.config.js` rewrites](https://github.com/matthewloh/5011cem-bff/blob/main/next.config.js) to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder.
On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running. Credits: [digitros](https://github.com/digitros/nextjs-fastapi)
In production, the FastAPI server and machine learning models are omitted, instead being stored as [static json files](https://github.com/matthewloh/5011cem-bff/tree/main/api/model_outputs) in /api/model-outputs.

## Demo

https://5011cem.vercel.app/home

## Deploy Your Own

The steps to production include seeding data and tables in a RDBMS provider of your choice (in this project, Supabase is used strictly for the Postgres instance). Prisma helps to decouple the database provider from the code. The Prisma clients for JS/TS and Python are used. The FastAPI application and machine learning models are not deployed in this version of the project.
After acquiring a valid DATABASE_URL and DIRECT_URL for Prisma, you can execute the .py seed scripts in `/prisma-scripts/epidemic` and `/prisma-scripts/epidemic` to seed the data using and tables respectively with the CSVs procured from MOH [Epidemic](https://github.com/MoH-Malaysia/covid19-public/tree/main/epidemic) and [Vaccination](https://github.com/MoH-Malaysia/covid19-public/tree/main/vaccination) data.

You can clone & deploy it to Vercel with one click after setting up the Prisma client and seeding the data:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmatthewloh%2F5011cem-bff%2Ftree%2Fmain)

## Developing Locally

You can choose to develop the database locally using a local [Supabase instance](https://supabase.com/docs/guides/cli/local-development) or a fully managed remote project. The Prisma client is used to interact with the database, while the FastAPI application is only used to serve the API endpoints for machine learning outputs. The Next.js application is used to serve the frontend.
You can clone & create this repo with the following commands

```bash
git clone https://github.com/matthewloh/5011cem-bff
cd 5011cem-bff
```

## Getting Started

### Python Dependencies

```bash
# Create a virtual environment
python3 -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

To run the FastAPI server, you can use the following command:

```bash
python -m uvicorn api.index:app
```

### Node Dependencies

```bash
npm install
# or
bun install
```

To run the Next.js server, you can use the following command:

```bash
# Generate the Prisma client
bun prisma db push
bun prisma generate

# Run the Next.js server
bun next dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

The FastAPI server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

<br/>

## Repository Structure

```bash
├── api # FastAPI application
│   ├── dataset
│   │   ├── ...
│   ├── model_binaries
│   │   ├── ...
│   ├── model_outputs
│   │   ├── ...
│   ├── index.py # /api/predict/arima and /api/predict/lstm and /api/predict/random_forest
├── app
│   ├── (dashboard)
│   ├── (api)
├── components
│   ├── ...
├── docs
│   ├── public
├── hooks
│   ├── ...
├── prisma
│   ├── schema.prisma
├── prisma-scripts
│   ├── epidemic
│   │   ├── malaysia_epidemic.py
│   │   ├── state_epidemic.py
│   └── vaccination
│   │   ├── malaysia_vaccination.py
│   │   ├── state_vaccination.py
├── public
│   ├── schema.prisma
├── utils
│   ├── ...
```
