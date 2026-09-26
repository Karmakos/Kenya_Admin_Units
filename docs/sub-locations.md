# Sub-locations

## GET /sub-locations

Returns sub-locations.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `location_id` | integer | No | Filter by location |
| `division_id` | integer | No | Filter by division |
| `q` | string | No | Search by name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## GET /sub-locations/:subLocationId

Returns one sub-location including its parent location.

## Related docs

- [Locations](./locations.md)
- [Special sub-locations](./special-sub-locations.md)
- [Routes](./routes.md)
