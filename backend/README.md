# IS Standards Recommendation API

Backend for the IS Standards Recommendation Engine portal. It serves `http://localhost:8000/api/v1`, stores the Indian Standards catalogue and officer feedback in MongoDB, and returns the JSON shapes the portal already renders.

The matcher is lexical. It detects the language of the query, maps procurement wording onto catalogue domains (cement, IT equipment, gold hallmarking, packaged water, and multi-item tenders), and loads the matching standards from MongoDB. The ranker is isolated in `services/matchingService.js` so a later semantic or model ranker can replace `rankCandidates` without changing the HTTP contract.

## File tree

```
backend/
├── server.js                     # Express app, CORS, 30s deadline, listen on port 8000
├── package.json
├── .env.example
├── config/
│   ├── db.js                     # Mongoose connection
│   └── env.js
├── models/
│   ├── Standard.js               # Catalogue document
│   └── Feedback.js               # Officer feedback
├── routes/
│   ├── index.js                  # Mounts /api/v1
│   ├── recommendRoutes.js
│   ├── standardRoutes.js
│   ├── feedbackRoutes.js
│   └── healthRoutes.js
├── controllers/
├── middleware/
│   ├── errorHandler.js           # Handoff error envelope
│   ├── upload.js                 # Multer memory storage, 10 MB, PDF/DOCX/TXT
│   ├── timeout.js
│   └── sanitizeBody.js
├── services/
│   ├── matchingService.js        # Lexical / future semantic ranker
│   ├── domains.js
│   ├── language.js
│   ├── textExtract.js            # In-memory PDF, DOCX, TXT extraction
│   └── presenters.js             # API projections
├── data/
│   └── standards.js              # Seed definitions, including IS 269
├── scripts/
│   └── seed.js
└── test/
    └── api.test.js
```

Uploaded files stay in memory and are discarded after text is extracted. Nothing is written under an uploads folder.

## Requirements

- Node.js 18 or newer
- MongoDB 6 or newer listening on `mongodb://127.0.0.1:27017`

## Setup

From the `backend` directory:

```powershell
npm install
Copy-Item .env.example .env
npm run seed
npm start
```

On macOS or Linux, copy the env file with `cp .env.example .env`.

`npm start` listens on port **8000**. `npm run dev` restarts the process when a file changes. `npm test` runs the contract tests and does not need MongoDB.

The server also starts with the defaults in `.env.example` if you skip creating `.env`. Create the file when you need a different database or origin list.

### Environment

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8000` | HTTP port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/is_standards_engine` | Catalogue and feedback database |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Browser origins allowed to call the API with credentials |
| `REQUEST_TIMEOUT_MS` | `30000` | Hard response budget. Values above 30000 are rejected |
| `DATA_LAST_SYNCED` | `2026-09-25` | Value returned by the health check |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Recommendation rate-limit window |
| `RATE_LIMIT_MAX` | `60` | Recommendation requests allowed per window per IP |

`http://localhost:5173` is always allowed, including when it is omitted from `CORS_ORIGINS`. Credentials are enabled. `http://localhost:3000` is included because this portal's Vite dev server uses that port.

Point the portal at this API with:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Endpoints

Base URL: `http://localhost:8000/api/v1`

| Method | Path | Behaviour |
|---|---|---|
| `GET` | `/health` | `{ "status": "ok", "data_last_synced": "2026-09-25" }` |
| `POST` | `/recommend` | JSON body `{ "query", "language", "include_allied", "include_cert" }`. `query` must be 10 to 5000 characters |
| `POST` | `/recommend/upload` | Multipart field `file` (PDF, DOCX, or TXT, up to 10 MB) plus the same flags |
| `POST` | `/recommend` with `multipart/form-data` | Same upload handler, so the current portal can post the file to `/recommend` |
| `GET` | `/standards/:id` | Profile for a stable id such as `IS-269`. `IS 269` and `IS 4031 (Part 1)` are also accepted |
| `POST` | `/feedback` | Saves feedback and returns `{ "status": "ok" }` |

Successful recommendation bodies include `request_id`, `detected_language`, `product_summary`, `primary_standards`, `allied_standards`, `certifications`, and `suggested_clause`. Uploads also include `document_info` and `items`.

List fields are always arrays. An unmatched query returns **200** with empty arrays and `status: "NO_MATCH_FOUND"`, which is the empty state the results page already renders. `NO_MATCH_FOUND` is returned as an error only when the catalogue itself has no row for a requested standard, or when the database has not been seeded.

### Portal field names

The React tables read a few names that differ from the stored schema. Each response includes both:

- `primary_standards` and `recommended_standards` are the same list. Cards carry `relevance_score` and `relevance`, and `latest_version` is the designation string the table prints. `latest_version_meta` is the stored object (`designation`, `year`, `reaffirmed_year`, `published_on`).
- `certifications` and `mandatory_certifications` are the same list.
- On `GET /standards/:id`, `latest_version` is the citation string the detail page prints, `bis_link` mirrors `bis_url`, and `scope` mirrors the longer scope text. Amendments and version history stay arrays.

`POST /feedback` accepts the handoff body (`rating`: `helpful` or `not_helpful`, plus `request_id`, `standard_id`, `comment`) and the body the portal sends today (`helpful` boolean, `comment`, `category`).

### Errors

Every failure uses this body and a `Content-Type` of `application/json; charset=utf-8`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The product description must be between 10 and 5000 characters.",
    "details": null
  }
}
```

`code` is one of `VALIDATION_ERROR`, `FILE_TOO_LARGE`, `UNSUPPORTED_FILE_TYPE`, `NO_MATCH_FOUND`, `RATE_LIMITED`, or `INTERNAL_ERROR`. `details` is always `null`.

## Catalogue

`npm run seed` upserts the definitions in `data/standards.js` and deletes catalogue rows whose ids are not in that file. The set includes IS 269 (Ordinary Portland Cement), the allied cement tests, the superseded IS 8112 and IS 12269 records, laptop and battery standards, gold hallmarking, and packaged drinking water.

Try these after seeding:

```powershell
curl http://localhost:8000/api/v1/health

curl -X POST http://localhost:8000/api/v1/recommend -H "Content-Type: application/json" -d "{\"query\":\"Procurement of Ordinary Portland Cement 43 Grade referencing IS 8112 for an RCC foundation\",\"language\":\"auto\",\"include_allied\":true,\"include_cert\":true}"

curl http://localhost:8000/api/v1/standards/IS-269

curl -X POST http://localhost:8000/api/v1/feedback -H "Content-Type: application/json" -d "{\"request_id\":\"REQ-2026-0929-1000\",\"standard_id\":\"IS-269\",\"rating\":\"helpful\",\"comment\":\"Clause was usable.\"}"
```

A query containing `quantum`, `flux capacitor`, or `nomatch` returns the empty match payload so the portal's no-match panel can be demonstrated.

## Response deadline

Each request is abandoned at 30 seconds. MongoDB queries in the matcher are capped at 8 seconds so a slow database fails inside that budget instead of hanging the browser.
