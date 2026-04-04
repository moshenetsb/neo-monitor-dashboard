# NEO Monitor Dashboard

A modern web dashboard for monitoring and exploring **Near-Earth Objects (NEOs)** data with advanced filtering, sorting, and visualization capabilities.

---

## Features

- Advanced filtering (velocity, diameter, hazard status)
- Hazardous asteroid detection
- Sentry objects filtering
- Sorting (date, velocity, diameter, danger score)
- URL-based state (shareable filters)
- Fast and responsive UI
- Clean popover-based filter controls

---

## How It Works

The dashboard allows users to explore asteroid data using dynamic filters and sorting options.

Filters are stored in the URL (`searchParams`), which means:
- state is shareable via link
- refreshing the page preserves filters
- UI stays in sync with query params

---

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **shadcn/ui**
- **Tailwind CSS**
- **Lucide Icons**
- **Recharts**

---

## Installation

```bash
git clone https://github.com/moshenetsb/neo-monitor-dashboard.git
cd neo-monitor-dashboard
npm install
```

---

## Author

GitHub [@moshenetsb](https://github.com/moshenetsb)
