#!/bin/bash

# Netlify Site Creation Script
# Usage: ./create-site.sh SITE_NAME GITHUB_REPO

if [ $# -ne 2 ]; then
    echo "Usage: $0 SITE_NAME GITHUB_REPO"
    echo "Example: $0 my-awesome-site user/repo"
    exit 1
fi

SITE_NAME="$1"
GITHUB_REPO="$2"

# Check if NETLIFY_ACCESS_TOKEN is set
if [ -z "$NETLIFY_ACCESS_TOKEN" ]; then
    echo "Error: NETLIFY_ACCESS_TOKEN environment variable is not set"
    echo "Get your token from: https://app.netlify.com/user/applications#personal-access-tokens"
    exit 1
fi

# Create site via Netlify API
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $NETLIFY_ACCESS_TOKEN" \
  -d '{
    "name": "'$SITE_NAME'",
    "repo": {
      "provider": "github",
      "repo": "'$GITHUB_REPO'",
      "branch": "main",
      "cmd": "npm run build",
      "dir": "dist"
    }
  }' \
  https://api.netlify.com/api/v1/sites

echo ""
echo "Site creation request sent!"
