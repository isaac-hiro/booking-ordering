## Booking Ordering system

### Booking Ordering system written in Node.js using TypeScript and Koa server

Install node modules

	npm install

Compile TypeScript files and start the server on port 4000 (with Hot Reload)

	npm run start
	
---
	
API Endpoints:

	http://localhost:4000/api/orderedBookings

POST only
Accepts an JSON array of Bookings data in the format:
	
	[
		{
			id: number,
			start: number,
			end: number
		}
	]
	
---
#### Tests

Run all tests

	npm run tests
	
Run Unit tests

	npm run test-unit
	
Run unit tests with watch mode
	
	npm run test-unit-watch
	
---
#### Coverage

After first time Unit tests have run, coverage is collected and accessible from `/test/reports/jest/index.html`.

---

#### Linting
	
Run TSLint

	npm run lint

---

#### Development

Start watching TypeScript files for changes and compiling them automatically

	npm run watch
	
