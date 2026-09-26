# Special sub-locations

## GET /special-sub-locations

Returns special sub-location records.

### Query parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `county_id` | integer | Filter by county |
| `q` | string | Search by name |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

## GET /special-sub-locations/:specialSubLocationId

Returns one special sub-location record.

## Related docs

- [Sub-locations](./sub-locations.md)
- [Routes](./routes.md)
