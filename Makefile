# Makefile for ICP project with Rust backend + React frontend

BACKEND_CANISTER := backend
FRONTEND_CANISTER := frontend


all: network-start deploy-all

install:
	cd frontend && npm install
	cargo build

dev: network-start deploy-back front-dev

network-start:
	icp network start -d || (icp network stop && icp network start -d)

stop:
	icp network stop

deploy-all:
	icp deploy

front-dev:
	cd frontend && npm run dev

deploy-front:
	icp deploy ${FRONTEND_CANISTER}

deploy-back:
	icp deploy ${BACKEND_CANISTER}

build-front:
	icp build ${FRONTEND_CANISTER}

clean:
	rm -rf ./.icp
	rm -rf ./targe
