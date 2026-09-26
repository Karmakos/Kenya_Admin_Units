# Base URLs

## Public API

```text
https://adminunits.buildwithkarimakos.com/api/v1
```

Example:

```http
GET /api/v1/counties
```

## Backend API

```text
https://api.adminunits.buildwithkarimakos.com/api/v1
```

The actual host, port, and internal service prefix should be confirmed during deployment.

## Access policy

| API | Intended consumer | Authorization |
| --- | ------------------ | ------------- |
| Public Backend API | Frontend app, public website, and approved clients | Public read access only unless explicitly restricted; protected by Redis rate limiting |
| Redis | Public API layer | Used for rate limiting and optional caching |
| Database | Backend service only | Database credentials and network restrictions |

## Related docs

- [Architecture](./architecture.md)
- [Routes](./routes.md)
- [Security and deployment](./security.md)
