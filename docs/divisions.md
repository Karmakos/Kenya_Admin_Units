# Divisions

## GET /divisions

Returns divisions.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `sub_county_id` | integer | No | Filter by sub-county |
| `q` | string | No | Search by division name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## GET /divisions/:divisionId

Returns one division and its parent sub-county.

## GET /divisions/:divisionId/locations

Returns all locations within a division.

## Related docs

- [Sub-counties](./sub-counties.md)
- [Locations](./locations.md)
- [Routes](./routes.md)
