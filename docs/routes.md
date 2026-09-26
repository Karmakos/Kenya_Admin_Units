# Routes

## Public route map

```text
/api/v1

├── /countries
│   ├── GET /
│   └── GET /:countryId
│
├── /counties
│   ├── GET /
│   ├── GET /:countyId
│   └── GET /:countyId/sub-counties
│
├── /sub-counties
│   ├── GET /
│   ├── GET /:subCountyId
│   ├── GET /:subCountyId/divisions
│   └── GET /:subCountyId/locations
│
├── /divisions
│   ├── GET /
│   ├── GET /:divisionId
│   └── GET /:divisionId/locations
│
├── /locations
│   ├── GET /
│   ├── GET /:locationId
│   └── GET /:locationId/sub-locations
│
├── /sub-locations
│   ├── GET /
│   └── GET /:subLocationId
│
├── /special-sub-locations
│   ├── GET /
│   └── GET /:specialSubLocationId
│
├── /urban-centres
│   ├── GET /
│   └── GET /:urbanCentreId
│
├── /search
│   └── GET /
├── /health
│   └── GET /
└── /status
    └── GET /
```

## Route responsibilities

- Country and county endpoints expose the top-level administrative hierarchy.
- Sub-county and division endpoints drill into lower administrative units.
- Location and sub-location endpoints serve the most granular hierarchy.
- Search allows fast name-based lookup across the full admin tree.
- Health and status endpoints support monitoring and deployment checks.

## Related docs

- [Countries](./countries.md)
- [Counties](./counties.md)
- [Sub-counties](./sub-counties.md)
- [Locations](./locations.md)
- [Search](./search.md)
