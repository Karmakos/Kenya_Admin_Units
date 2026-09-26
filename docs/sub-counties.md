# Sub-counties

## GET /sub-counties

Returns sub-counties.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `county_id` | integer | No | Filter by county |
| `county_code` | string | No | Filter by county code |
| `q` | string | No | Search by sub-county name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## GET /sub-counties/:subCountyId

Returns one sub-county and its parent county.

## GET /sub-counties/:subCountyId/divisions

Returns all divisions attached to a sub-county.

## GET /sub-counties/:subCountyId/locations

Returns all locations belonging to a sub-county.

## Related docs

- [Counties](./counties.md)
- [Divisions](./divisions.md)
- [Locations](./locations.md)
