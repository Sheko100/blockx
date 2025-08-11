# Makefile for ICP project with Rust backend + React frontend

BACKEND_CANISTER := blockx_backend
PACKAGE_NAME := blockx
WASM_PATH := target/wasm32-unknown-unknown/release/$(PACKAGE_NAME).wasm
DID_PATH := backend/src/blockx_rust.did
DECLARATIONS_PATH := declarations

all: dev deploy-all candid declarations

dev:
	dfx start --background || (dfx stop && dfx start --background)

stop-dev:
	dfx stop

deploy-all:
	dfx deploy || dfx stop

candid:
	candid-extractor ${WASM_PATH} > ${DID_PATH}

declarations:
	rm -rf declarations && dfx generate ${BACKEND_CANISTER}

clean:
	cargo clean -r
	dfx stop
	rm -rf .dfx
	rm -rf declarartions

clean-cargo-all:
	cargo clean
