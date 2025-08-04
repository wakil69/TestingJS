# 🧪 Vitest Cheat Sheet

> A quick reference for unit testing using **[Vitest](https://vitest.dev/)** — a blazing fast test runner powered by Vite.

---

## 📦 Installation

```bash
npm install --save-dev vitest
```

Or with Vite:

```bash
npm create vite@latest my-app
cd my-app
npm install
npm install --save-dev vitest
```

Add to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

---

## 🚀 Run Tests

```bash
npx vitest               # Run all tests
npx vitest run           # Run in CI (no UI/watch)
npx vitest --watch       # Watch mode
npx vitest --coverage    # With code coverage
```

---

## 📁 File Naming

Vitest picks up files like:

* `*.test.js` / `*.test.ts`
* `*.spec.js` / `*.spec.ts`

---

## 🧱 Basic Test Syntax

```js
import { describe, it, expect } from 'vitest'

describe('Math utilities', () => {
  it('adds two numbers', () => {
    expect(1 + 2).toBe(3)
  })

  it('multiplies correctly', () => {
    expect(2 * 3).toEqual(6)
  })
})
```

`describe()`

* **Purpose:** Groups related tests together.
* Think of it as a "test suite" — a label for a group of similar tests.

```js
describe('Math utilities', () => {
  // grouped tests go here
})
```

This helps organize your tests and gives readable output.

---

`it()` (alias: `test()`)

* **Purpose:** Defines a single test case.
* Takes two arguments:

  1. A **description** of the test
  2. A **function** that runs the test logic


You can use `test()` instead of `it()` — they’re interchangeable.

---

`expect()`

* **Purpose:** Makes an **assertion** — a claim that must be true for the test to pass.
* You call `expect(value)` and chain a matcher (e.g. `toBe`, `toEqual`, etc.)


---

## ✅ Matchers

| Matcher              | Description              |
| -------------------- | ------------------------ |
| `toBe(x)`            | Strict equality          |
| `toEqual(obj)`       | Deep equality            |
| `toContain(x)`       | In array or string       |
| `toBeTruthy()`       | Is truthy                |
| `toBeFalsy()`        | Is falsy                 |
| `toBeDefined()`      | Not `undefined`          |
| `toBeNull()`         | Is `null`                |
| `toBeGreaterThan(x)` | Numeric comparison       |
| `toThrow()`          | Function throws an error |

---

## 🧪 Asynchronous Tests

```js
export async function fetchData() {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()
  return data
}

it('resolves with data', async () => {
  const result = await fetchData()
  expect(result).toBeDefined()
})
```

Or with `done` callback:

```js
it('calls callback', (done) => {
  asyncFn(() => {
    expect(true).toBe(true)
    done()
  })
})
```

---

## 🧰 Mocking

Mocking lets you isolate the code you’re testing by **replacing real dependencies with fake ones**. You can:

* Replace a function/module
* Control its return value
* Track how it's called
* Reset or restore the original behavior

---

### 🔧 Manual Mocks (Overriding Modules)

```js
vi.mock('./api', () => ({
  fetchData: vi.fn(() => 'mocked response'),
}))
```

* This replaces the `fetchData` function inside the `./api` module.
* The mock returns `'mocked response'` instead of making an actual API call.

✅ Useful when:

* You want predictable data
* You want to avoid external services

---

### 📥 Mock with Dynamic Return Values

```js
vi.mock('./api', () => {
  return {
    fetchData: vi.fn().mockReturnValue('static response'),
  }
})
```

Or return a Promise:

```js
fetchData: vi.fn().mockResolvedValue({ success: true })
```

And for rejected Promises:

```js
fetchData: vi.fn().mockRejectedValue(new Error('API failed'))
```

---

### 🕵️ Spy on Functions

```js
const logSpy = vi.fn()
logSpy('debug message')

expect(logSpy).toHaveBeenCalled()
expect(logSpy).toHaveBeenCalledWith('debug message')
```

#### 🧠 Why use spies?

* To verify a callback was used
* To check arguments passed to utility/helper functions

---

### 🧪 Spying on Real Functions

```js
const obj = {
  greet: (name) => `Hello, ${name}`,
}

const spy = vi.spyOn(obj, 'greet')
obj.greet('Alice')

expect(spy).toHaveReturnedWith('Hello, Alice')
```

Spies let you **watch real methods** without fully mocking them — good for partially testing a module.

---

### ♻️ Resetting and Restoring Mocks

#### Reset call history only:

```js
vi.clearAllMocks()
```

#### Restore original behavior:

```js
vi.restoreAllMocks()
```

#### Reset everything:

```js
vi.resetAllMocks()
```

✅ Use `restoreAllMocks()` in `afterEach()` to ensure clean test runs.

---

🔐 Best Practices

| Tip                                     | Reason                                    |
| --------------------------------------- | ----------------------------------------- |
| Use `vi.mock()` at the **top level**    | Ensures the mock is active before imports |
| Reset mocks between tests               | Prevents test pollution                   |
| Prefer `mockResolvedValue()` for async  | Matches real async behavior               |
| Use spies for monitoring internal calls | Keeps real implementation intact          |


---

## 🧪 Lifecycle Hooks

```js
beforeEach(() => {
  // runs before each test
})

afterEach(() => {
  // runs after each test
})

beforeAll(() => {
  // runs once before all tests
})

afterAll(() => {
  // runs once after all tests
})
```

---

## 📊 Code Coverage

**Code coverage** shows how much of your code runs when you run your tests.

---

### 🔍 Example

```js
function greet(name) {
  if (name) return `Hello, ${name}`
  return 'Hello'
}
```

If you only test `greet('Alice')`, the `return 'Hello'` line is **not covered**.

---

### 🔢 Coverage Types

* **Line** – Which lines ran
* **Function** – Which functions ran
* **Branch** – If/else paths
* **Statement** – Total JS statements

---

### 🚀 Run with Vitest

Install:

```bash
npm install -D c8
```

Then:

```bash
npx vitest run --coverage
```

You’ll get a summary + a detailed HTML report in `/coverage/`.

---

**Tip:** Aim for meaningful coverage — not just 100%. Quality > quantity.


---

## 💡 Tips

* `--ui`: Use Vitest's built-in UI (`npx vitest --ui`)
* `vi.useFakeTimers()` & `vi.advanceTimersByTime(ms)` for time control
* `--include`, `--exclude`, and `--testNamePattern` to filter tests

---

## TypeScript Support

No special setup needed with Vite. Just use `.ts` or `.tsx` in tests.