#!/bin/bash

# Post-build script to ensure entry.mjs is accessible at the expected Vercel location
echo "Post-build: Ensuring entry.mjs is accessible..."

# Check if the entry.mjs exists in the Vercel output location
if [ -f ".vercel/output/functions/_render.func/dist/server/entry.mjs" ]; then
    echo "✅ entry.mjs found in .vercel/output/functions/_render.func/dist/server/"
    
    # Create the dist/server directory if it doesn't exist
    mkdir -p dist/server
    
    # Copy the entry.mjs to the expected location
    cp .vercel/output/functions/_render.func/dist/server/entry.mjs dist/server/entry.mjs
    echo "✅ Copied entry.mjs to dist/server/entry.mjs"
    
    # Also create a symlink as backup
    ln -sf ../../.vercel/output/functions/_render.func/dist/server/entry.mjs dist/server/entry.mjs.link
    echo "✅ Created symlink backup"
else
    echo "❌ entry.mjs not found in expected Vercel location"
    exit 1
fi

echo "Post-build completed successfully"