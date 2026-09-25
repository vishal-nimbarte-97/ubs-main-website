# UBS Website Backend API Requirements

This document is for the backend developer to understand the dynamic sections required by the client for the UBS website.

## 1. Project Context

The frontend is an Angular application. Some sections are already dynamic, but most content is still static in the codebase and needs to be moved to backend-driven APIs.

Current dynamic patterns already exist in:
- Admin login
- Live status
- Announcements / news / events management
- Browser/session storage for auth and site content

Current static pages that need backend data:
- Home page
- Library page
- Tuition page
- Residential programmes page
- Publications page
- Gallery page
- Student zone page

## 2. Required Dynamic Features

### A. Home Page
1. YouTube Live status and channel link
   - Need live status toggle
   - Need dynamic YouTube channel URL
   - Need a visible live button on the home page

2. Official Notifications
   - Display at home page top or inside a notifications section
   - Should support title, description, optional link, and active/inactive state

3. Admission Enquiry email
   - Must be configurable from backend
   - Used for mailto links in the app

4. Principal section / image
   - Principal name, title, photo, quote, short biography

5. Official notification CTA button on home top section
   - Same as notifications item above; should redirect to the official notifications page or notifications section

### B. Library Page
1. Librarian details
   - Librarian name
   - Designation
   - Image
   - Short profile/description

2. Library policies / sections
   - Library highlights
   - Reading spaces
   - Policy lists

### C. Tuition & Fees Page
1. Dynamic fee data by programme type
2. Fee table should support:
   - Residential programmes
   - Non-residential programmes
   - Short-term courses
3. Fee rows must be year-based
4. Contact/registrar email should be configurable

### D. Residential Programmes Page
1. Admissions essentials
   - application fees
   - deadlines
   - contact emails
2. Programme information should be configurable by programme type
3. Should allow future updates easily

### E. Publications Page
1. Add publications in future
2. Each publication may have:
   - title
   - description
   - publication status
   - cover image
   - date
   - category
   - link

### F. Gallery / Student Zone
1. Gallery images should be loaded dynamically
2. Categories like Campus, Learning, Heritage, People
3. Student zone images and committee/gallery content should be API-backed

---

## 3. Suggested API Modules

### 3.1 Live Status API
Base: `/api/live`

Endpoints:
- GET `/api/live/status`
- PUT `/api/live/status`

Example response:
```json
{
  "isLive": true,
  "channelUrl": "https://youtube.com/@unionbsmedia",
  "updatedAt": "2026-09-19T10:00:00Z"
}
```

---

### 3.2 Notifications API
Base: `/api/notifications`

Endpoints:
- GET `/api/notifications`
- GET `/api/notifications/{id}`
- POST `/api/notifications`
- PUT `/api/notifications/{id}`
- DELETE `/api/notifications/{id}`

Example model:
```json
{
  "id": 1,
  "title": "Admissions Open for 2026-27",
  "description": "Applications are now open for the residential programmes.",
  "link": "https://example.com/admissions",
  "isActive": true,
  "createdAt": "2026-09-19T10:00:00Z",
  "expiresAt": null
}
```

---

### 3.3 Site Configuration API
Base: `/api/site-config`

Endpoints:
- GET `/api/site-config`
- PUT `/api/site-config`

Example model:
```json
{
  "admissionsEmail": "admissions@ubs.ac.in",
  "registrarEmail": "registrar@ubs.ac.in",
  "principalEmail": "principal@ubs.ac.in",
  "libraryEmail": "library@ubs.ac.in",
  "supportPhone": "+91-00000-00000",
  "youtubeChannelUrl": "https://youtube.com/@unionbsmedia"
}
```

---

### 3.4 People / Profiles API

This is the shared module for Principal, Librarian, and Faculty profiles. The
frontend uses the same model for all three categories and selects the public
content by the `category` value.

Base URL currently used by the frontend: `http://ubsapi.xplorelogic.in/api`

#### Endpoints currently called by the frontend

| Operation | Method | URL | Request body |
|---|---|---|---|
| Get all profiles | GET | `/People/GetAll` | None |
| Create profile | POST | `/People/Insert` | `PeopleInsertRequest` JSON |
| Delete profile | POST | `/People/Delete/{id}` | None |

The current frontend does not call `PUT` for editing an existing profile. If
edit support is required later, add `PUT /People/Update/{id}` or
`PUT /People/Update` and update the frontend service at the same time.

#### People response model

`GET /People/GetAll` must return a JSON array. Property names should use the
same camelCase names shown below because Angular maps these names directly.

```json
[
  {
    "id": 1,
    "name": "Dr. W.S. Annie",
    "designation": "Principal, Union Biblical Seminary",
    "category": "principal",
    "imageUrl": "/uploads/people/principal.jpg",
    "quote": "Speaking the Truth in Love",
    "bio": "Principal profile description.",
    "isActive": true,
    "email": "principal@ubs.ac.in",
    "department": null,
    "qualificationTitle": null,
    "qualification": [],
    "specialization": [],
    "books": [],
    "research": [],
    "articles": [],
    "journals": [],
    "pdfPath": null
  }
]
```

#### Insert request model

`POST /People/Insert` receives this JSON payload. The `id` field must not be
required for inserts and may be omitted or set by the database.

```json
{
  "name": "string, required",
  "designation": "string, required",
  "category": "principal | librarian | faculty, required",
  "imageUrl": "string, required; stored image URL or base64 data URL",
  "quote": "string, optional; use empty string when not provided",
  "bio": "string, optional; use empty string when not provided",
  "isActive": true,
  "email": "string, optional",
  "department": "string, optional",
  "qualificationTitle": "string, optional",
  "qualification": ["string"],
  "specialization": ["string"],
  "books": ["string"],
  "research": ["string"],
  "articles": ["string"],
  "journals": ["string"],
  "pdfPath": "string, optional"
}
```

#### Principal payload example

```json
{
  "name": "Dr. W.S. Annie",
  "designation": "Principal, Union Biblical Seminary",
  "category": "principal",
  "imageUrl": "/uploads/people/principal.jpg",
  "quote": "Speaking the Truth in Love",
  "bio": "The principal's profile and message shown on the home and campus pages.",
  "isActive": true,
  "email": "principal@ubs.ac.in",
  "department": null,
  "qualificationTitle": null,
  "qualification": [],
  "specialization": [],
  "books": [],
  "research": [],
  "articles": [],
  "journals": [],
  "pdfPath": null
}
```

#### Librarian payload example

```json
{
  "name": "Mr. Sungjemmeren Kijong Imchen",
  "designation": "Librarian, UBS Library",
  "category": "librarian",
  "imageUrl": "/uploads/people/librarian.jpg",
  "quote": "Knowledge is a gift to be shared.",
  "bio": "The librarian profile and library description shown on the library page.",
  "isActive": true,
  "email": "library@ubs.ac.in",
  "department": null,
  "qualificationTitle": null,
  "qualification": [],
  "specialization": [],
  "books": [],
  "research": [],
  "articles": [],
  "journals": [],
  "pdfPath": null
}
```

#### Faculty payload example

```json
{
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
  "books": [
    "Published book or chapter title"
  ],
  "research": [
    "Research area or project"
  ],
  "articles": [
    "Published article title"
  ],
  "journals": [
    "Journal publication title"
  ],
  "pdfPath": "/uploads/people/lanuwabang-jamir.pdf"
}
```

#### Category validation rules

- `category` must be lowercase: `principal`, `librarian`, or `faculty`.
- `name`, `designation`, `category`, `imageUrl`, and `isActive` are common
  fields for every profile.
- Only one active Principal and one active Librarian should normally be
  allowed. The frontend displays the first matching active record.
- Faculty records may have multiple active entries.
- Faculty fields must be returned as JSON arrays, never comma-separated strings.
  Empty arrays are preferred over `null`.
- `email`, `department`, `qualificationTitle`, and `pdfPath` may be `null` or
  an empty string when they are not applicable.

#### Image handling requirement

The current admin form reads an image file as a base64 data URL and sends that
string in `imageUrl`, for example:

```text
data:image/png;base64,iVBORw0KGgoAAA...
```

The backend should either accept and store this value, or preferably decode it,
save the file under an uploads folder, and return a normal public URL in
`imageUrl`. Returning a normal URL is recommended because storing large base64
strings directly in the database increases payload and database size.

#### Delete response

`POST /People/Delete/{id}` receives no request body. Return HTTP 200 with a
boolean or a small success object, for example:

```json
{
  "success": true
}
```

The frontend only requires the request to complete successfully and then
removes the record from the admin list.

---

### 3.5 Admissions API
Base: `/api/admissions`

Endpoints:
- GET `/api/admissions/essentials?programmeType=residential`
- GET `/api/admissions/deadlines`
- GET `/api/admissions/contacts`
- POST `/api/admissions/essentials`
- PUT `/api/admissions/essentials/{id}`

Example model:
```json
{
  "programmeType": "residential",
  "fees": [
    { "label": "Application fee", "value": "₹800" },
    { "label": "Late fee", "value": "₹500" }
  ],
  "deadlines": [
    { "programme": "BD / M.Th. / D.Th.", "date": "19 January 2026" }
  ],
  "contacts": [
    { "label": "Application forms", "email": "registrar@ubs.ac.in" }
  ],
  "academicYear": "2026-27"
}
```

---

### 3.6 Fees / Tuition API
Base: `/api/fees`

Endpoints:
- GET `/api/fees?academicYear=2026-27`
- POST `/api/fees`
- PUT `/api/fees/{id}`
- DELETE `/api/fees/{id}`

Example model:
```json
{
  "id": 1,
  "programmeName": "Residential programmes",
  "mainCampus": "To be updated",
  "onlineCampus": "Not applicable",
  "extension": "Not applicable",
  "academicYear": "2026-27",
  "isActive": true
}
```

---

### 3.7 Publications API
Base: `/api/publications`

Endpoints:
- GET `/api/publications`
- GET `/api/publications/{id}`
- POST `/api/publications`
- PUT `/api/publications/{id}`
- DELETE `/api/publications/{id}`

Example model:
```json
{
  "id": 1,
  "title": "Theological Reflection",
  "description": "Research and reflection publication from UBS.",
  "status": "Coming Soon",
  "category": "Research",
  "coverImageUrl": "/uploads/publications/cover.jpg",
  "publishedDate": "2026-09-19",
  "link": "https://example.com/publication/1",
  "isFeatured": false,
  "isActive": true
}
```

---

### 3.8 Gallery API
Base: `/api/gallery`

Endpoints:
- GET `/api/gallery`
- GET `/api/gallery?category=Campus`
- GET `/api/gallery/{id}`
- POST `/api/gallery`
- PUT `/api/gallery/{id}`
- DELETE `/api/gallery/{id}`

Example model:
```json
{
  "id": 1,
  "title": "A place to grow",
  "category": "Campus",
  "imageUrl": "/uploads/gallery/image_1.jpg",
  "altText": "UBS campus building",
  "isActive": true
}
```

---

### 3.9 Student Zone API
Base: `/api/student-zone`

Endpoints:
- GET `/api/student-zone/gallery`
- GET `/api/student-zone/committees`
- POST `/api/student-zone/gallery`
- DELETE `/api/student-zone/gallery/{id}`

Example model:
```json
{
  "id": 1,
  "title": "Prayer Team",
  "category": "Committee",
  "imageUrl": "/uploads/student-zone/prayer-team.jpg",
  "description": "Student prayer and fellowship activities",
  "isActive": true
}
```

---

## 4. Authentication and Session Handling

Auth token is already designed to be stored in session storage in frontend. The backend should support:
- login endpoint
- token-based auth for admin actions
- protect admin CRUD endpoints

Example auth flow:
- POST `/api/auth/login`
- Response contains JWT or token
- Frontend stores it in session storage
- Admin APIs require token in Authorization header

---

## 5. Important Notes for Backend

1. All client-facing content should be admin editable.
2. Most pages need year-based records for future changes.
3. Use `isActive` flags for soft delete and future updates.
4. Use media URLs instead of binary uploads for easier frontend handling.
5. Keep all contact emails and URLs in a central config table for easy updates.
6. Photo fields should support CDN or public file storage paths.

---

## 6. Final Summary

The client wants the website to behave like a CMS-driven portal, not a static brochure website. The backend must support content management for:
- live broadcast
- official notifications
- contact config
- principal/librarian profiles
- tuition fees
- residential admissions
- publications
- gallery and student zone assets

These features are all feasible and should be implemented using a clean domain-based API structure.
