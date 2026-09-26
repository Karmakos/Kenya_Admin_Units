# Overview

The Kenya Administrative Units API provides read-only access to Kenya's administrative geography stored in PostgreSQL.

The system covers the hierarchy from country to county, sub-county, division, location, and sub-location. It also includes special sub-locations and urban centre records associated with counties.

## Scope

This API is intended to support:

- country and county discovery
- sub-county and division lookups
- location and sub-location browsing
- special sub-location classification
- urban centre references by county
- public search across the national administrative structure

## Public API expectations

The API is public and intended for both:

- frontend application consumption
- approved external client access

Because it is public, Redis is used as the traffic protection layer to apply rate limiting and optional caching.

## Access model

- Clients do not connect directly to PostgreSQL.
- The backend service is the single authoritative access layer.
- Redis is used for rate limiting and caching, not for authorization.
- Authentication and authorization are implemented separately if required by protected endpoints.

## Versioning

All routes are expected to live under:

```text
/api/v1
```

## Related docs

- [Architecture](./architecture.md)
- [Base URLs](./base-urls.md)
- [Routes](./routes.md)
