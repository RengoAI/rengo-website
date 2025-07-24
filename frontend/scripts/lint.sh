#!/usr/bin/env bash

set -o errexit
set -o nounset

ESLINT_ARGS="${ESLINT_ARGS-}"
PRETTIER_ARGS="${PRETTIER_ARGS-}"

ESLINT_CACHE_ARGS="--cache --cache-location ./node_modules/.cache/eslint-cache"

set -x

# TypeScript type checking
echo "Running TypeScript type checking..."
tsc --noEmit

eslint \
  $ESLINT_CACHE_ARGS \
  $ESLINT_ARGS \
  "src/"

prettier --cache --check $PRETTIER_ARGS "src/**/*.{js,jsx,ts,tsx,json,css,scss,md,mdx}"
