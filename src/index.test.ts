// src/index.test.ts
import { test, type TestContext } from 'node:test'

test('1 + 2 = 3', (t: TestContext) => {
  t.assert.deepStrictEqual(1 + 2, 3)
})
