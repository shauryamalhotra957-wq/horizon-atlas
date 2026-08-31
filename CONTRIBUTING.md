# Contributing

Install the locked JavaScript dependencies and run the available checks:

~~~bash
npm ci
npm test
npm run build
~~~

Keep map inputs bounded and validate external feed payloads before calculations or exports. Add a regression test for changes to geospatial rendering, data transforms, or download behavior.

Do not commit private coordinates, provider keys, or unverified intelligence as fact.
