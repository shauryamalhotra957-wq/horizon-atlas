# Contributing

Thanks for improving Horizon Atlas.

## Development setup

1. Fork or clone the repository.
2. Create a focused branch from `main`.
3. Install the locked dependencies with `npm ci`.
4. Start the app with `npm run dev`.

## Quality checks

Run:

```bash
npm run lint
npm test
```

The test command includes a production build and rendered-output checks. If database schemas change, include the generated migration and describe its rollout impact.

## Pull requests

Explain the problem, implementation, migration impact, and validation. Never commit secrets or production data.
