#!/bin/bash

# Auto-load Node.js version from .nvmrc file
# Add this to your .bashrc or .bash_profile

# Function to auto-load nvm version from .nvmrc
autoload_nvm() {
    if [ -f ".nvmrc" ]; then
        local nvmrc_version=$(cat .nvmrc)
        local current_version=$(nvm current 2>/dev/null)
        
        if [ "$current_version" != "$nvmrc_version" ]; then
            echo "Found .nvmrc with Node.js version: $nvmrc_version"
            echo "Switching to Node.js version: $nvmrc_version"
            nvm use "$nvmrc_version"
        fi
    fi
}

# Hook into cd command to auto-load nvm version
cd() {
    builtin cd "$@"
    autoload_nvm
}

# Also run on shell startup if .nvmrc exists
autoload_nvm 
