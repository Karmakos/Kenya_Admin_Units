# Response format

## Successful response

Single-resource endpoints return an object.

List endpoints return records with pagination metadata.

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 0,
    "pages": 0
  }
}
```

## Error response

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "County was not found"
  }
}
```

## HTTP status codes

| Status | Meaning |
| ------ | ------- |
| `200` | Request completed successfully |
| `400` | Invalid query parameter or request |
| `404` | Resource was not found |
| `500` | Unexpected server error |

## Related docs

- [Routes](./routes.md)
- [Security and deployment](./security.md)
