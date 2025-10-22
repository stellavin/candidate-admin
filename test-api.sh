#!/bin/bash
# Test GraphQL API connection

# Read API key from .env
if [ -f .env ]; then
  export $(cat .env | grep VITE_GRAPHQL_API_KEY | xargs)
fi

API_KEY="${VITE_GRAPHQL_API_KEY}"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "da2-placeholder-add-your-real-key-here" ]; then
  echo "❌ No valid API key found in .env"
  echo "Please edit .env and add your real API key"
  exit 1
fi

echo "Testing GraphQL API..."
echo "Endpoint: https://fzkswiotczcbzniswyvjshdvda.appsync-api.eu-west-2.amazonaws.com/graphql"
echo ""

# Test introspection
curl -X POST \
  https://fzkswiotczcbzniswyvjshdvda.appsync-api.eu-west-2.amazonaws.com/graphql \
  -H "Content-Type: application/json" \
  -H "x-api-key: ${API_KEY}" \
  -d '{"query": "{ __schema { queryType { name } } }"}' \
  2>/dev/null

echo ""
echo ""
echo "If you see schema info above (not UnauthorizedException), your key works! ✅"
echo "If you see UnauthorizedException, check your API key in AWS Console"

