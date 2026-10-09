# UBS Website Backend API Handoff

**Document purpose:** Exact backend contract required by the current Angular website and Admin Dashboard.

**Source of truth:** `src/app/config/api-urls.ts`, `src/app/services/admin/admin-content.service.ts`, `src/app/services/dashboard/live-status.service.ts`, `src/app/admin/dashboard/dashboard.component.ts`, `src/app/admin/dashboard/dashboard.component.html`, and the public page components.

**Important:** The existing frontend uses controller-style routes such as `GetAll`, `Insert`, and `POST Delete/{id}`. Implement those routes exactly unless the frontend is changed at the same time.

---

## 1. Base URLs and Authentication

Production API base URL currently configured in Angular:

```text
http://ubsapi.xplorelogic.in/api
```

Local API base URL configured in Angular:

```text
https://localhost:7257/api
```

The frontend sends this header for requests made through `AdminContentService` when a token exists:

```http
Authorization: Bearer {sessionStorage['ubs-admin-token']}
```

Admin CRUD endpoints must validate the bearer token. Public GET endpoints may be public, depending on backend policy.

### Login

```http
POST /api/Auth/Login
Content-Type: application/json
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

The response must contain a token that the frontend can store as `ubs-admin-token` in session storage. A compatible response may be:

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Administrator"
  }
}
```

The frontend currently has register URL constants but does not call registration.

---

## 2. Endpoint Summary

| Module | Read | Create/Save | Delete |
|---|---|---|---|
| Live status | `GET /Live/GetStatus` | `POST /Live/SetStatus` | Not applicable |
| Site configuration | `GET /SiteConfig/Get` | `POST /SiteConfig/Save` | Not applicable |
| Notifications | `GET /Notifications/GetAll` | `POST /Notifications/Insert` | `POST /Notifications/Delete/{id}` |
| People | `GET /People/GetAll` | `POST /People/Insert` | `POST /People/Delete/{id}` |
| Tuition fees | `GET /TuitionFees/GetAll` | `POST /TuitionFees/Insert` | `POST /TuitionFees/Delete/{id}` |
| Admissions | `GET /Admissions/GetEssentials` | `POST /Admissions/SaveEssentials` | Not applicable |
| Publications | `GET /Publications/GetAll` | `POST /Publications/Insert` | `POST /Publications/Delete/{id}` |
| Gallery | `GET /Gallery/GetAll` | `POST /Gallery/Insert` | `POST /Gallery/Delete/{id}` |
| Student Zone | `GET /StudentZoneGallery/GetAll` | `POST /StudentZoneGallery/Insert` | `POST /StudentZoneGallery/Delete/{id}` |

All URLs above are relative to `/api`.

The current frontend has no update/edit calls. If update support is added, add an Angular service method and dashboard edit UI together with the backend endpoint.

---

## 3. Common Response and Error Rules

### Collection responses

Collection GET endpoints must return JSON arrays directly:

```json
[]
```

or:

```json
[
  {
    "id": 1
  }
]
```

Do not wrap arrays in `{ "data": [...] }` unless the Angular service is updated.

### Save responses

Create/save endpoints should return the saved object, including its database-generated `id`:

```json
{
  "id": 42,
  "name": "Saved value"
}
```

The dashboard prepends the returned object to its local list.

### Delete responses

Delete endpoints may return a boolean or success object. The frontend only requires a successful HTTP response:

```json
true
```

or:

```json
{
  "success": true
}
```

Delete requests have no JSON body. The frontend sends `undefined`.

### HTTP status expectations

- `200` for successful GET, save, and delete operations.
- `201` is acceptable for inserts only if the Angular HTTP client handling remains compatible.
- `400` for validation errors.
- `401` for missing or invalid admin token.
- `404` for a missing record.
- `500` only for unexpected server failures.

Recommended validation errors:

```json
{
  "message": "Validation failed",
  "errors": {
    "name": ["Name is required"]
  }
}
```

---

## 4. Live Status

### Endpoints

```http
GET  /api/Live/GetStatus
POST /api/Live/SetStatus
```

### GET response

```json
{
  "isLive": true,
  "channelUrl": "https://youtube.com/@UnionbsMedia",
  "updatedAt": "2026-09-26T10:00:00Z"
}
```

`updatedAt` is optional but recommended.

### POST request

```json
{
  "isLive": true,
  "channelUrl": "https://youtube.com/@UnionbsMedia"
}
```

### POST response

Return the saved `LiveStatus` object.

The public Home page polls live status approximately every 20 seconds. The admin Dashboard also toggles this value.

---

## 5. Site Configuration

### Endpoints

```http
GET  /api/SiteConfig/Get
POST /api/SiteConfig/Save
```

### Model and save payload

```json
{
  "admissionsEmail": "admissions@ubs.ac.in",
  "registrarEmail": "registrar@ubs.ac.in",
  "principalEmail": "principal@ubs.ac.in",
  "libraryEmail": "library@ubs.ac.in",
  "supportPhone": "+91-00000-00000",
  "youtubeChannelUrl": "https://youtube.com/@UnionbsMedia"
}
```

The TypeScript service supports this module, but its Dashboard UI section is currently commented out. The backend should still support it for future activation.

---

## 6. Notifications / Updates

The Updates description supports rich text. `description` remains a string in the request/response and may contain HTML from the Quill editor. Persist and return the formatted string without HTML-encoding it; the website sanitizes this value before rendering.

### Endpoints

```http
GET  /api/Notifications/GetAll
POST /api/Notifications/Insert
POST /api/Notifications/Delete/{id}
```

### Response model

```json
{
  "id": 1,
  "title": "Admissions Open for 2026-27",
  "description": "Applications are now open.",
  "link": "/apply",
  "isActive": true,
  "createdAt": "2026-09-26T10:00:00Z",
  "type": "announcement"
}
```

### Insert payload

```json
{
  "title": "Admissions Open for 2026-27",
  "description": "Applications are now open.",
  "link": "/apply",
  "isActive": true
}
```

The Dashboard form supports these types:

```text
announcement
news
event
```

The frontend removes `type` before posting in the current implementation and infers or restores it from the response. The backend may return `type`, but should not require it for insert unless the frontend is updated.

Recommended future fields:

```json
{
  "expiresAt": "2026-12-31T23:59:59Z"
}
```

The current frontend does not send or enforce `expiresAt`.

---

## 7. People: Principal, Librarian, and Faculty

### Endpoints

```http
GET  /api/People/GetAll
POST /api/People/Insert
POST /api/People/Delete/{id}
```

### Response and insert model

```json
{
  "id": 1,
  "name": "Dr. Lanuwabang Jamir",
  "designation": "Associate Professor, New Testament",
  "category": "faculty",
  "imageUrl": "/uploads/people/lanuwabang-jamir.jpg",
  "quote": "",
  "bio": "Faculty biography.",
  "isActive": true,
  "email": "lanu@ubs.ac.in",
  "department": "Biblical Studies: New Testament",
  "qualificationTitle": "PhD",
  "qualification": [
    "PhD - Middlesex University, 2012"
  ],
  "specialization": [
    "Pauline Studies"
  ],
  "books": [],
  "research": [],
  "articles": [],
  "journals": [],
  "pdfPath": "/uploads/people/lanuwabang-jamir.pdf"
}
```

### Allowed categories

```text
principal
librarian
faculty
```

Faculty department/type values currently used by the public page:

```text
Biblical Studies: Old Testament
Biblical Studies: New Testament
Christian Theology
History of Christianity
Christian Ministry
Missiology
```

The admin form also supports `Other`, so custom department/type names must be accepted and stored in `department`.

### Validation

- `name` is required.
- `designation` is required.
- `category` is required and lowercase.
- `imageUrl` is required by the current backend requirements, although the frontend may send an empty value for records without an image.
- `isActive` is required.
- `qualification`, `specialization`, `books`, `research`, `articles`, and `journals` must be JSON arrays, never comma-separated strings.
- Only one active principal and one active librarian should normally be allowed.
- Multiple active faculty records are allowed.

### Faculty form behavior

The admin Dashboard converts each faculty textarea into an array by splitting on commas and newlines:

```text
Input:
Hebrew Bible
Ancient West Asia

Payload:
["Hebrew Bible", "Ancient West Asia"]
```

### Image behavior

The current frontend uses `FileReader.readAsDataURL()` and sends a base64 data URL in `imageUrl`:

```text
data:image/png;base64,iVBORw0KGgoAAA...
```

Recommended backend behavior:

1. Detect data URL input.
2. Decode and store the file under a public uploads directory.
3. Return a normal public URL in `imageUrl`.
4. Preserve the returned URL on subsequent GET requests.

---

## 8. Tuition Fees

### Endpoints

```http
GET  /api/TuitionFees/GetAll
POST /api/TuitionFees/Insert
POST /api/TuitionFees/Delete/{id}
```

### Frontend payload

The frontend sends the following canonical fields and may also send legacy-compatible fields:

```json
{
  "id": null,
  "programmeType": "residential",
  "course": "Bachelor of Divinity",
  "singleStudent": "120000",
  "marriedStudentWithQuarters": "150000",
  "english": "",
  "hindi": "",
  "marathi": "",
  "academicYear": "2026-27",
  "isActive": true,
  "programmeName": "Bachelor of Divinity",
  "mainCampus": "120000",
  "onlineCampus": "",
  "extension": ""
}
```

### Programme types

```text
residential
non-residential
```

The UI form currently exposes residential and non-residential rows. A short-term course can be supported by accepting another `programmeType` value, but the frontend must also be updated to expose it.

### Required behavior

- Return only JSON arrays from GET.
- Support multiple academic years.
- Preserve `isActive`.
- Accept both canonical and legacy fields until the frontend contract is simplified.

---

## 9. Admissions Essentials

### Endpoints

```http
GET  /api/Admissions/GetEssentials
POST /api/Admissions/SaveEssentials
```

### Payload and response model

```json
{
  "programmeType": "residential",
  "academicYear": "2026-27",
  "fees": [
    {
      "label": "Application fee",
      "value": "₹800"
    },
    {
      "label": "Late fee",
      "value": "₹500"
    }
  ],
  "deadlines": [
    {
      "programme": "BD / M.Th. / D.Th.",
      "date": "19 January 2026"
    }
  ],
  "contacts": [
    {
      "label": "Admissions",
      "email": "admissions@ubs.ac.in"
    }
  ]
}
```

The Dashboard saves the complete object. Fee, deadline, and contact rows are edited inside the object; there are no separate row endpoints in the current frontend.

---

## 10. Publications

### Endpoints

```http
GET  /api/Publications/GetAll
POST /api/Publications/Insert
POST /api/Publications/Delete/{id}
```

### Model and insert payload

```json
{
  "id": null,
  "title": "Theological Reflection",
  "description": "Research and reflection publication from UBS.",
  "status": "Draft",
  "category": "Research",
  "coverImageUrl": "/uploads/publications/cover.jpg",
  "publishedDate": "2026-09-26",
  "link": "https://example.com/publication/1",
  "isFeatured": false,
  "isActive": true
}
```

The Dashboard initializes `isFeatured` and `isActive`, but the current form does not expose controls for them. The backend should still persist both values.

Cover images may arrive as base64 data URLs in `coverImageUrl`; normal public URLs are recommended after storage.

---

## 11. Main Gallery

### Endpoints

```http
GET  /api/Gallery/GetAll
POST /api/Gallery/Insert
POST /api/Gallery/Delete/{id}
```

### Model and insert payload

```json
{
  "id": null,
  "title": "Campus Life",
  "category": "Campus",
  "imageUrl": "/uploads/gallery/campus-life.jpg",
  "altText": "UBS campus community",
  "isActive": true
}
```

Allowed category values used by the Gallery filter:

```text
Campus
Learning
Heritage
People
```

The public Gallery replaces its static collection only when active API items exist. Invalid categories are displayed as `Campus` by the current frontend.

---

## 12. Student Zone and UBSSF Community Gallery

This endpoint is used for both ordinary Student Zone images and the new dynamic UBSSF Community module.

### Endpoints

```http
GET  /api/StudentZoneGallery/GetAll
POST /api/StudentZoneGallery/Insert
POST /api/StudentZoneGallery/Delete/{id}
```

### Standard Student Zone image payload

```json
{
  "id": null,
  "title": "Student life",
  "category": "Student Zone",
  "imageUrl": "/uploads/student-zone/student-life.jpg",
  "altText": "Student life at UBS",
  "isActive": true
}
```

### UBSSF Community image payload

Each uploaded image is one record. Multiple records with the same `title` form one community gallery.

```json
{
  "id": null,
  "title": "Prayer Committee",
  "category": "UBSSF Community",
  "imageUrl": "/uploads/student-zone/communities/prayer-committee-01.jpg",
  "altText": "Prayer Committee community image",
  "isActive": true
}
```

A custom community type uses the same shape:

```json
{
  "title": "Drama and Worship Team",
  "category": "UBSSF Community",
  "imageUrl": "/uploads/student-zone/communities/drama-worship-01.jpg",
  "altText": "Drama and Worship Team community image",
  "isActive": true
}
```

### Grouping rule

The frontend groups active records by exact `title` where:

```text
category == "UBSSF Community"
```

Example records:

```json
[
  {
    "id": 1,
    "title": "Prayer Committee",
    "category": "UBSSF Community",
    "imageUrl": "/uploads/prayer-01.jpg",
    "altText": "Prayer Committee image 1",
    "isActive": true
  },
  {
    "id": 2,
    "title": "Prayer Committee",
    "category": "UBSSF Community",
    "imageUrl": "/uploads/prayer-02.jpg",
    "altText": "Prayer Committee image 2",
    "isActive": true
  }
]
```

The public Student Zone and Gallery render these as one `Prayer Committee` card with two popup images.

### Community upload behavior

The Admin Dashboard:

1. Selects an existing committee type or enters `Other` custom text.
2. Selects multiple image files.
3. Converts each file to a base64 data URL.
4. Sends one `POST /StudentZoneGallery/Insert` request per image.
5. Uses the same community name in every request.
6. Shows each returned record in the admin list.

Recommended backend implementation is to decode each base64 image, store it, and return a public URL. Do not require the frontend to upload one multipart request because the current Angular client sends JSON records one at a time.

---

## 13. Admin Dashboard Modules

The Dashboard currently exposes these modules:

### Overview
Read-only dashboard metrics and content status.

### Live Broadcast
Uses live status service:

```json
{
  "isLive": true,
  "channelUrl": "https://youtube.com/@UnionbsMedia"
}
```

### Updates
Creates and deletes notifications.

### People
Creates and deletes principal, librarian, and faculty records.

### Tuition
Creates and deletes fee rows.

### Admissions
Saves the complete admissions essentials object.

### Publications
Creates and deletes publications.

### Gallery
Creates and deletes main Gallery records.

### Community
Creates multiple `UBSSF Community` Student Zone records using one community name and multiple images. Deletes individual image records.

### Student Zone
Creates and deletes ordinary Student Zone image records.

The current Dashboard has no edit/update UI for existing records. Delete is the only destructive operation exposed.

---

## 14. Public Dynamic Consumers

| Public page | API data consumed | Fallback/static behavior |
|---|---|---|
| Home | Active principal, active notifications, live status | Most home sections remain static |
| Campus | Active principal | Campus content remains static |
| Faculty | Active faculty profiles | Uses a large static faculty list when no faculty records exist |
| Library | First active librarian | Policies and library content remain static |
| Tuition | Tuition fee rows | Uses static tables when API data is absent/invalid |
| Residential programmes | Admissions fees, deadlines, contacts | Programme descriptions remain static |
| Publications | Active publications | Static placeholder remains if API returns no items |
| Gallery | Active Gallery records | Static gallery remains if API returns no items |
| Gallery UBSSF section | Active Student Zone records with `category = UBSSF Community` | Static committee image sets remain if no community records exist |
| Student Zone | Active `UBSSF Community` records grouped by title | Static UBSSF committee content remains if no records exist |

The following areas are still primarily static and need separate APIs if full CMS control is required:

- Home hero/content sections.
- Home events, news, and testimonials.
- Campus facilities and campus sections.
- Library policies and reading zones.
- Residential and non-residential programme descriptions.
- Gallery featured events.
- Student Zone committee descriptions and duties.
- History page content and timeline.
- About, Alumni, Apply, FAQ, and other informational page content.

---

## 15. Media Storage Requirements

The current frontend can send base64 data URLs for:

- People profile images.
- Publication cover images.
- Gallery images.
- Student Zone images.
- UBSSF Community images.

Recommended backend workflow:

1. Validate MIME type (`image/jpeg`, `image/png`, `image/webp`, etc.).
2. Enforce a maximum decoded file size.
3. Decode the data URL safely.
4. Generate a unique filename.
5. Store under a public uploads directory or object storage.
6. Return a normal absolute or root-relative URL.
7. Persist only the URL in the database when possible.

Example returned URL:

```text
/uploads/student-zone/communities/prayer-committee-01.webp
```

Do not return a private filesystem path.

---

## 16. Soft Delete and Active Records

The frontend reads active records in public components. Recommended behavior:

- Delete may physically delete the row, or set `isActive = false`.
- GET endpoints used by public pages should return active records only, or return `isActive` so the frontend can filter them.
- Admin lists should return inactive records only if the Dashboard is later updated to show archived content.
- Preserve IDs in save responses.

---

## 17. Frontend/Backend Contract Gaps to Resolve

These items should be agreed with the backend developer before production:

1. **Controller routes versus REST routes:** current Angular uses `GetAll`, `Insert`, and POST delete routes. The older requirements document describes REST paths such as `/api/gallery` and HTTP DELETE. Use the current controller routes or update Angular consistently.
2. **Live status method:** current Angular uses `POST /Live/SetStatus`; the older document says `PUT`.
3. **Site config method:** current Angular uses `POST /SiteConfig/Save`; the older document says `PUT`.
4. **No update endpoints:** current UI supports create and delete only.
5. **Base64 uploads:** current UI sends JSON data URLs, not multipart form data.
6. **Community model:** community images are separate records grouped by exact title; there is currently no separate Community table or community ID.
7. **Description fields:** `GalleryItem` has `altText`, not a community description. Student Zone descriptions are currently synthesized on the public page.
8. **Notifications expiry:** `expiresAt` is not currently implemented in Angular.
9. **Site config UI:** backend integration exists in TypeScript, but the Dashboard form is commented out.
10. **Fallback masking:** Angular falls back to static content when reads fail, so backend failures may not be visually obvious during testing.

---

## 18. Backend Delivery Checklist

- [ ] Implement exact `/api` controller-style routes listed in this document.
- [ ] Return direct JSON arrays for collection GET endpoints.
- [ ] Return saved records with generated IDs from insert/save endpoints.
- [ ] Accept empty arrays instead of null for faculty list fields.
- [ ] Validate and authorize all admin mutations.
- [ ] Support bearer token authentication.
- [ ] Decode and store base64 media safely.
- [ ] Return public media URLs.
- [ ] Support multiple `UBSSF Community` records with the same title.
- [ ] Keep `category = "UBSSF Community"` exact and case-sensitive unless Angular is updated.
- [ ] Preserve `isActive` values.
- [ ] Return successful delete responses with HTTP 200.
- [ ] Test payloads from the Admin Dashboard against every insert endpoint.
- [ ] Test public pages with empty arrays, active records, inactive records, and API failures.
- [ ] Confirm CORS allows the Angular development and production origins.
- [ ] Confirm HTTPS is used for production API traffic.

---

## 19. Recommended Future Improvements

These are not required for the current frontend but are recommended for a complete CMS:

- Add `PUT` update endpoints and edit controls for every admin module.
- Add a dedicated `Community` table with a stable community ID, description, sort order, and active flag.
- Store community images in a child table linked by community ID instead of grouping by title.
- Add ordering fields for gallery images and committee cards.
- Add image deletion/archive status separately from community status.
- Add expiry dates to notifications.
- Add server-side pagination for gallery, people, notifications, and publications.
- Add audit fields: `createdAt`, `updatedAt`, `createdBy`, and `updatedBy`.
- Move remaining static page content into backend-managed content sections.

---

## 20. Minimal Community Database Design Recommendation

If the backend wants a normalized model instead of grouping Student Zone records by title:

### Communities

```json
{
  "id": 1,
  "name": "Prayer Committee",
  "description": "Student prayer and fellowship activities.",
  "category": "UBSSF Community",
  "isActive": true,
  "sortOrder": 1
}
```

### Community images

```json
{
  "id": 1,
  "communityId": 1,
  "imageUrl": "/uploads/communities/prayer-01.jpg",
  "altText": "Prayer Committee activity",
  "sortOrder": 1,
  "isActive": true
}
```

That normalized model is preferable for long-term management, but the current Angular implementation is compatible with the simpler one-record-per-image Student Zone contract described in Section 12.
