# Urban centres

## GET /urban-centres

Returns urban centres.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `county_id` | integer | No | Filter by county |
| `q` | string | No | Search by urban centre name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## GET /urban-centres/:urbanCentreId

Returns one urban centre and its parent county.

## Related docs

- [Counties](./counties.md)
- [Routes](./routes.md)
