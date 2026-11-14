#!/bin/bash -e

source "$(dirname "${BASH_SOURCE[0]}")/assertions.sh"

NODE_OPTIONS=--max-old-space-size=8192
export NODE_OPTIONS

if [ "$1" = "production" ]; then
    echo "vite build set to production."
    pnpm exec vite build --outDir build
elif [ "$1" = "sandbox" ]; then
    echo "vite build set to sandbox."
    pnpx vite build --mode sandbox --outDir build
else
    echo "vite build set to preview."
    pnpx vite build --mode preview --outDir build
fi

# Give each public page its own index.html, so deep links return 200.
pnpm exec vite-node src/scripts/prerender-routes.ts build
