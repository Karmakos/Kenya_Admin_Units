# Locations

## GET /locations

Returns locations.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `division_id` | integer | No | Filter by division |
| `sub_county_id` | integer | No | Filter by parent sub-county |
| `q` | string | No | Search by location name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## GET /locations/:locationId

Returns one location and its parent division.

## GET /locations/:locationId/sub-locations

Returns all sub-locations belonging to a location.

## Related docs

- [Divisions](./divisions.md)
- [Sub-locations](./sub-locations.md)
- [Routes](./routes.md)
