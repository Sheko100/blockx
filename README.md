# Verisys

Verisys is an Internet Computer application for registering and verifying ownership records for physical and digital assets. Asset records are stored by the backend canister, and users can verify a record using its hash and category.

## Requirements

- ICP CLI (`icp`)
- Node.js with npm
- Rust with the `wasm32-unknown-unknown` target

## Get Started

**Run the local development**

This will start local icp network, deploying the backend canister, and run development server through Vite

```sh
make dev
```

**Run in local production**

In production, frontend is served on http://frontend.local.localhost:8000/

```sh
make
```

Install frontend dependencies (first setup, or after dependency changes):

```sh
cd frontend
npm ci
```

Run Vite in a separate terminal:

```sh
cd frontend
npm run dev
```

Open the local URL printed by Vite. The Vite configuration reads the local ICP network and backend canister information, so start the network and deploy the backend before launching Vite.

If backend code changes, redeploy the backend:

```sh
make deploy-back
```

Stop the local network that is running in the background  when finished:s

```sh
make stop
```

## Production deployment

Build and deploy all configured canisters:

```sh
make deploy-all
```

This deploys the backend and frontend. To publish a frontend change on its own, rebuild and redeploy the frontend canister:

```sh
make deploy-front
```

To publish a backend change on its own:

```sh
make deploy-back
```

## Other useful commands

Build the frontend canister without deploying it:

```sh
make build-front
```

Run the frontend linter:

```sh
cd frontend
npm run lint
```

## Features

- Register physical and non-physical assets
- Authenticate with Internet Identity
- View a user's registered assets
- Verify a registered asset using its hash and category
- Download an asset registration certificate

## Project layout

See [DIRECTORY_STRUCTURE.md](DIRECTORY_STRUCTURE.md) for the full project directory structure.

```text
backend/       Rust backend canister
frontend/      React and Vite frontend
public/        Frontend assets prepared for canister deployment
icp.yaml       ICP canister and build configuration
Makefile       Local network, build, and deployment commands
```

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the architecture overview and diagram.
