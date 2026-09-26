# Counties

## GET /counties

Returns all counties.

### Query parameters

| Parameter | Type | Required | Description | Example |
| --------- | ---- | -------- | ----------- | ------- |
| `country_id` | integer | No | Filter by country ID | `country_id=1` |
| `country_code` | string | No | Filter by country code | `country_code=KE` |
| `q` | string | No | Search by county name or code | `q=nairobi` |
| `page` | integer | No | Page number | `page=1` |
| `limit` | integer | No | Records per page | `limit=25` |

## GET /counties/:countyId

Returns one county with its parent country and code.

### Path parameter

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `countyId` | integer | Yes | County database ID |

## GET /counties/:countyId/sub-counties

Returns all sub-counties belonging to a county.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `q` | string | No | Search by sub-county name |
| `page` | integer | No | Page number |
| `limit` | integer | No | Records per page |

## Related docs

- [Countries](./countries.md)
- [Sub-counties](./sub-counties.md)
- [Routes](./routes.md)
