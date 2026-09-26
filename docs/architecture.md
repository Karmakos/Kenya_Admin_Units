# Architecture

## Request flow

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

## Responsibilities

| Layer | Responsibility |
| ----- | ------------- |
| Client / Frontend App | Calls the same public backend API using standard HTTP requests. |
| Redis | Enforces request rate limiting, protects public endpoints from abuse, and can cache frequently requested administrative data. |
| Public Backend API | Validates input, resolves administrative hierarchy queries, applies business rules, and returns structured JSON responses for both public clients and the frontend app. |
| PostgreSQL | Stores the Kenya administrative hierarchy, including country, county, sub-county, division, location, and sub-location information. |

## Access principles

- Public endpoints must be explicitly marked as public.
- Redis is used for throttling and caching, not authorization.
- Authentication and authorization must be enforced on any restricted endpoint.
- Database access is restricted to the backend service.
- Clients must never connect directly to PostgreSQL.

## Rate limiting strategy

Redis should be used for:

- request quotas per IP or API key
- short-term abuse prevention
- caching common queries such as counties or sub-counties
- protecting the PostgreSQL database from burst traffic

## Related docs

- [Overview](./overview.md)
- [Base URLs](./base-urls.md)
- [Security and deployment](./security.md)
