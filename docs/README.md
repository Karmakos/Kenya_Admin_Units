# Kenya Administrative Units API Docs

This folder contains the split documentation for the Kenya Administrative Units API.

## Documentation index

- [Overview](./overview.md)
- [Architecture](./architecture.md)
- [Base URLs](./base-urls.md)
- [Routes](./routes.md)
- [Countries](./countries.md)
- [Counties](./counties.md)
- [Sub-counties](./sub-counties.md)
- [Divisions](./divisions.md)
- [Locations](./locations.md)
- [Sub-locations](./sub-locations.md)
- [Special sub-locations](./special-sub-locations.md)
- [Urban centres](./urban-centres.md)
- [Search](./search.md)
- [Response format](./response-format.md)
- [Security and deployment](./security.md)

## API summary

The Kenya Administrative Units API exposes Kenya's administrative hierarchy stored in PostgreSQL.

### Supported hierarchy

```text
Country
  └── County
      └── Sub-county
          └── Division
              └── Location
                  └── Sub-location
```

### Public API pattern

```text
Client / Frontend App
  │
  ▼
Redis (rate limiting + caching)
  │
  ▼
Public Backend API
  │
  ▼
PostgreSQL
```

### Version

- API version: v1
- Base path: /api/v1

### Core endpoints

- /countries
- /counties
- /sub-counties
- /divisions
- /locations
- /sub-locations
- /special-sub-locations
- /urban-centres
- /search
- /health

## Design goals

- Public read access to administrative units
- Clear administrative hierarchy lookups
- Search and filtering by county, sub-county, location, and sub-location
- Redis-based rate limiting and optional caching
- A consistent response format across all endpoints

## Start here

- Read [Overview](./overview.md) for scope and goals.
- Read [Architecture](./architecture.md) for the request flow and rate limiting design.
- Read [Routes](./routes.md) for the complete endpoint map.
