# DTRMND Web

React + Vite storefront for DTRMND with an AI-powered virtual try-on experience. The frontend lives in `src/` and a lightweight Express server (`server/index.js`) proxies file uploads to OpenAI.

## Quick start

```sh
npm install
cp .env.example .env  # fill in OPENAI_API_KEY plus any overrides
```

Run the backend and frontend in two terminals:

```sh
# Terminal 1 – AI try-on API
npm run server

# Terminal 2 – storefront
npm start
```

When running locally, the try-on page expects `VITE_TRYON_ENDPOINT=http://localhost:3001/api/try-on` (pre-filled in `.env.example`) so the frontend routes uploads through your Express API.

## Environment variables

| Variable | Description |
| --- | --- |
| `OPENAI_API_KEY` | Required. Used by the server to call OpenAI. Keep this secret. |
| `PORT` | Optional. Port for the Express server (defaults to `3001`). |
| `CLIENT_ORIGIN` | Optional. Origin allowed to call the API (defaults to `http://localhost:5173`). |
| `OPENAI_IMAGE_MODEL` | Optional. Override the OpenAI image model (`gpt-image-1`). |
| `OPENAI_IMAGE_SIZE` | Optional. Output size (`auto` by default, or `1024x1024`, `1024x1536`, `1536x1024`). |
| `OPENAI_IMAGE_QUALITY` | Optional. `auto`, `low`, `medium`, or `high`. |
| `OPENAI_IMAGE_BACKGROUND` | Optional. Background setting (`auto`, `transparent`, `opaque`). |
| `VITE_TRYON_ENDPOINT` | Frontend-only env var so the React app knows where to submit try-on requests. |

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Runs Vite dev server on `5173`. |
| `npm run dev` | Alias for `npm start`. |
| `npm run build` | Production build. |
| `npm run preview` | Preview the production build. |
| `npm run server` | Starts the Express try-on API. |

## OpenAI try-on flow

1. User uploads a selfie on `/try-on`.
2. Frontend sends `multipart/form-data` (`userImage` + `productId`) to `/api/try-on`.
3. Server validates inputs, forwards the image + garment prompt to `gpt-image-1`, and responds with `imageBase64`.
4. React displays the generated render; if the API errors, the server responds with a curated fallback image so users still see something. Use the developer console/server logs for detailed errors.
