## Booking Ordering system

### Booking Ordering system written in Node.js using TypeScript and Koa server

Install node modules

	npm install

Compile TypeScript files and start the server on port 4000 (with Hot Reload)

	npm run start
	
---
	
#### API Endpoints

	http://localhost:4000/api/orderedBookings

#### Input

POST only.

Accepts a JSON array of Bookings data in the format:
	
	[
	  {
	    id: number,
	    start: number,
	    end: number
	  }
	]

#### Functionality

Bookings are then ordered in the most optimal way following these rules:

- Bookings are arranged in a way that they make up a route connecting end points with start points
- Longest possible route from the first booking is created
- Then a longest possible route from the rest of the bookings is created and so on
- When there are no more bookings left, it is tried to connect the created routes with each other
- A relocation happens when it is not possible to connect two routes
- It is tried to create as few routes as possible in order to minimize relocations

#### Output

Endpoint responds with an array of ordered bookings id-s:

	[ 1 , 2, 3 ]

---

#### Tests

Run all unit and integration tests

	npm run test
	
Run tests with watch mode
	
	npm run test-watch
	
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
	
