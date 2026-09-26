# Countries

## GET /countries

Returns all countries.

### Query parameters

| Parameter | Type | Required | Description | Example |
| --------- | ---- | -------- | ----------- | ------- |
| `page` | integer | No | Page number | `page=1` |
| `limit` | integer | No | Records per page | `limit=25` |

## GET /countries/:countryId

Returns a single country and its associated counties.

### Path parameter

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `countryId` | integer | Yes | Country database ID |

### Alternative lookup parameters

| Parameter | Type | Required | Description | Example |
| --------- | ---- | -------- | ----------- | ------- |
| `country_code` | string | No | Country code | `country_code=KE` |
| `country_name` | string | No | Case-insensitive country name | `country_name=Kenya` |

## Related docs

- [Counties](./counties.md)
- [Routes](./routes.md)
