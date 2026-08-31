# Security policy

Horizon Atlas is a planetary-intelligence prototype.

- Keep provider credentials and private geospatial or environmental data out of Git history.
- Validate external feed payloads before calculations, rendering, storage, or downloads.
- Bound map queries, exports, and uploaded assets to prevent resource exhaustion.
- Clearly label seeded, simulated, and estimated values; do not use them as operational truth without validation.
- Review any new integrations for origin checks, authentication, data retention, and least privilege.

Report suspected credential exposure, injection, unsafe export, or sensitive-location disclosure privately to the repository owner.
