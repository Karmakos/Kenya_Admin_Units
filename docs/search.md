# Search

## GET /search

Searches across administrative names such as:

- countries
- counties
- sub-counties
- divisions
- locations
- sub-locations
- special sub-locations
- urban centres

### Query parameters

| Parameter | Type | Required | Description | Example |
| --------- | ---- | -------- | ----------- | ------- |
| `q` | string | Yes | Search term | `q=nairobi` |
| `type` | string | No | Filter by entity type | `type=county` |
| `page` | integer | No | Page number | `page=1` |
| `limit` | integer | No | Records per page | `limit=25` |

### Supported type values

```text
country
county
sub_county
division
location
sub_location
special_sub_location
urban_centre
```

## Related docs

- [Routes](./routes.md)
- [Countries](./countries.md)
- [Counties](./counties.md)
