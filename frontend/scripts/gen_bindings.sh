#!/bin/bash

cd ../.. && dfx generate blockx || exit 1

rm -r frontend/src/declarations/blockx > /dev/null 2>&1 || true

mkdir -p frontend/src/declarations/blockx
mv src/declarations/blockx frontend/src/declarations
rmdir -p src/declarations > /dev/null 2>&1 || true
