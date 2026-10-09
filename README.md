# Verisys

**Verisys** is an [Internet Computer](https://internetcomputer.org/) dApp for registering and verifying ownership of assets whether they are physical assets or non-physical assets like ideas or anything digital.

## Requirements

- [Rust](https://rust-lang.org/tools/install/)
- [Node.js](https://nodejs.org/en/download)
- [ICP CLI]() with *rust* toolchain

## Get Started

##### Local Development

**In first setup, install all dependencies**

```sh
make install 
```

**Run a local development server**

This will start local icp network, deploying the backend canister, and run development server through Vite

```sh
make dev
```

**Run a local production server**

You can test the whole project deployed as ICP canisters by running:

```sh
make
```

In production, frontend is served on [http://frontend.local.localhost:8000/](http://frontend.local.localhost:8000/)

## Features

- Register physical and non-physical assets
- Authenticate with Internet Identity
- View a user's registered assets
- Verify a registered asset using its hash
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

## Contributing

1. Fork the repo
2. Create a new branch
3. Add, commit and push your updates
4. Open a pull request

**Please, follow the following rules while contributing**:

- Use small, meaningful commits: feat: add register_asset, fix: overflow on id

- Open issues with reproducing steps and environment

## Roadmap

- The ability to transfer asset ownership

- Integrating more authentication methods (other wallets)

- Integrating NLP technology to check assets simalarities

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the architecture overview and diagram.

## Useful Links

- https://js.icp.build/ - Docs for ICP JavaScript frontend libraries

- https://docs.internetcomputer.org/languages/rust/ - Docs for using rust as backend

- [Internet Identity](https://docs.internetcomputer.org/guides/authentication/internet-identity/) - Docs for the Internet Identity (current authentication)

- [https://docs.internetcomputer.org/guides/testing/strategies/](https://docs.internetcomputer.org/guides/testing/strategies/) - Docs for testing

- https://docs.internetcomputer.org/developer-tools/ - Docs for some useful tools

- [https://docs.internetcomputer.org/concepts/canisters/](https://docs.internetcomputer.org/concepts/canisters/) - Docs on canisters and how they behave
