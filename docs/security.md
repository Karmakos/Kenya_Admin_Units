# Security and deployment

Before exposing the API to production, confirm:

* [ ] Backend API base URL
* [ ] Which endpoints are public
* [ ] Which endpoints require authentication
* [ ] Which users or services can access protected endpoints
* [ ] Authentication mechanism
* [ ] Authorization middleware
* [ ] Database access restricted to backend
* [ ] Input validation for all query and path parameters
* [ ] Rate limiting for public endpoints
* [ ] CORS policy
* [ ] Error response policy
* [ ] Logging and monitoring
* [ ] API versioning strategy

## Redis rate limiting checklist

* [ ] Public request quotas are configured
* [ ] Redis is in front of the backend API
* [ ] Cache keys are namespaced correctly
* [ ] Expired cache entries are evicted
* [ ] Rate-limit responses return `429` when limits are exceeded

## Related docs

- [Architecture](./architecture.md)
- [Base URLs](./base-urls.md)
- [Response format](./response-format.md)
