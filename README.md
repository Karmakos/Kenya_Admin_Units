# Kenya Administrative Units

This project contains the Kenya administrative units dataset and the API documentation for the public data layer.

## Project overview

The project stores Kenya's administrative hierarchy, including:

- countries
- counties
- sub-counties
- divisions
- locations
- sub-locations
- special sub-locations
- urban centres

## API documentation

The full API documentation is organized in the docs folder.

- [Documentation index](./docs/README.md)
- [Overview](./docs/overview.md)
- [Architecture](./docs/architecture.md)
- [Base URLs](./docs/base-urls.md)
- [Routes](./docs/routes.md)
- [Countries](./docs/countries.md)
- [Counties](./docs/counties.md)
- [Sub-counties](./docs/sub-counties.md)
- [Divisions](./docs/divisions.md)
- [Locations](./docs/locations.md)
- [Sub-locations](./docs/sub-locations.md)
- [Special sub-locations](./docs/special-sub-locations.md)
- [Urban centres](./docs/urban-centres.md)
- [Search](./docs/search.md)
- [Response format](./docs/response-format.md)
- [Security and deployment](./docs/security.md)

## API summary

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

## Version

- API version: `v1`
- Base path: `/api/v1`

## Notes

This project is currently focused on the administrative hierarchy and public read access. More security and deployment details should be confirmed before production rollout.
