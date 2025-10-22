# Get Your API Key

## Steps

1. **Go to AWS Console**
   - Navigate to AppSync service
   - Select your API (the one with endpoint: `fzkswiotczcbzniswyvjshdvda`)

2. **Get API Key**
   - Click on "Settings" tab
   - Under "API Keys" section
   - Copy the key (starts with `da2-`)

3. **Add to .env**
   ```bash
   # Open .env file
   nano .env
   # or
   code .env
   ```
   
   Replace placeholder with your real key:
   ```env
   VITE_GRAPHQL_API_KEY=da2-your-actual-key-copied-from-aws
   ```

4. **Test it works**
   ```bash
   # Replace YOUR_KEY with the actual key
   curl -X POST https://fzkswiotczcbzniswyvjshdvda.appsync-api.eu-west-2.amazonaws.com/graphql \
     -H "Content-Type: application/json" \
     -H "x-api-key: YOUR_KEY" \
     -d '{"query": "{ __schema { queryType { name } } }"}'
   ```
   
   Should return schema info (not "UnauthorizedException")

5. **Restart dev server**
   ```bash
   npm run dev
   ```

## Current Status

✅ Endpoint is accessible
✅ GraphQL server is responding
❌ Need valid API key to fetch data

The endpoint returned:
```json
{
  "errors": [{
    "errorType": "UnauthorizedException",
    "message": "You are not authorized to make this call."
  }]
}
```

This means you need to add your real key from AWS Console.

