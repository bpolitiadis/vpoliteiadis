#!/bin/bash

# Post-build script to ensure entry.mjs is in the correct location for Vercel
# This script ensures the entry point is accessible at the expected path

echo "Post-build: Ensuring entry.mjs is accessible..."

# Check if the entry.mjs exists in the expected Vercel location
if [ -f ".vercel/output/_functions/entry.mjs" ]; then
    echo "✅ entry.mjs found in .vercel/output/_functions/"
    
    # Create a symlink in dist/server if it doesn't exist
    if [ ! -f "dist/server/entry.mjs" ]; then
        echo "Creating symlink from dist/server/entry.mjs to .vercel/output/_functions/entry.mjs"
        mkdir -p dist/server
        ln -sf ../../.vercel/output/_functions/entry.mjs dist/server/entry.mjs
        echo "✅ Symlink created"
    else
        echo "✅ dist/server/entry.mjs already exists"
    fi
else
    echo "❌ entry.mjs not found in .vercel/output/_functions/"
    exit 1
fi

echo "Post-build completed successfully"
