# DeviceDada Backend

Express server that turns DeviceDada quiz answers into AI device
recommendations using the Google Gemini API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file from the template and add your key:
   ```bash
   cp .env.example .env
   # then edit .env and set GEMINI_API_KEY
   ```
   Get a key at https://aistudio.google.com/app/apikey.
3. Start the server:
   ```bash
   npm run dev   # auto-reload
   # or
   npm start
   ```

The server runs on `http://localhost:4000` by default.

## API

### `POST /api/recommend`

Request body:
```json
{ "answers": { "category": "phone", "brands": ["samsung"], "budget": "mid", "usage": "camera" } }
```

Response:
```json
{ "recommendations": [ { "id": "...", "name": "...", "category": "...", "price": "...", "specs": ["..."], "tag": "...", "badge": "...", "reason": "..." } ] }
```

## Security

The Gemini API key is read from the `GEMINI_API_KEY` environment variable and
stays server-side. It is never sent to the browser. The `.env` file is
git-ignored, so the key is never committed to the repository.
