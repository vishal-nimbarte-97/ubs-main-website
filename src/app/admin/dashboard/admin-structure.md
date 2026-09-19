# Admin Dashboard Structure

This dashboard follows a modular, component-based layout so each form and section is independent and easier to maintain.

## Folder structure

src/app/admin/
├── dashboard/
│   ├── admin-structure.md
│   ├── dashboard.component.ts
│   ├── dashboard.component.html
│   ├── dashboard.component.scss
│   ├── components/
│   │   ├── admin-shell/
│   │   │   ├── admin-shell.component.ts
│   │   │   ├── admin-shell.component.html
│   │   │   └── admin-shell.component.scss
│   │   ├── admin-sidebar/
│   │   │   ├── admin-sidebar.component.ts
│   │   │   ├── admin-sidebar.component.html
│   │   │   └── admin-sidebar.component.scss
│   │   ├── overview/
│   │   │   ├── dashboard-overview.component.ts
│   │   │   ├── dashboard-overview.component.html
│   │   │   └── dashboard-overview.component.scss
│   │   ├── live-broadcast/
│   │   │   ├── live-broadcast.component.ts
│   │   │   ├── live-broadcast.component.html
│   │   │   └── live-broadcast.component.scss
│   │   └── sections/
│   │       ├── announcements/
│   │       ├── news/
│   │       ├── events/
│   │       ├── site-config/
│   │       ├── people/
│   │       ├── tuition/
│   │       ├── admissions/
│   │       ├── publications/
│   │       ├── gallery/
│   │       └── student-zone/
│   └── shared/
│       └── admin-shared.scss
├── login/
│   ├── login.component.ts
│   ├── login.component.html
│   └── login.component.scss
└── guards/
    └── auth.guard.ts

## Design pattern

- Shell component handles the page structure and top bar.
- Sidebar component renders admin navigation and selection state.
- Each content section can later become a standalone form component.
- Shared styles provide consistent spacing, panel design, and form styling.
- This keeps the dashboard responsive, easier to test, and cleaner for API integration.

## Next step

Each section folder under `components/sections` should contain:
- component.ts
- component.html
- component.scss
- typed form model
- API call methods
