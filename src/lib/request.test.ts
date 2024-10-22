import { test, before, mock, type TestContext } from 'node:test'
import { request } from './request.ts'

before(() => {
  mock.method(globalThis, 'fetch', () => {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: async () => 'defualt response'
    } as Response)
  })
})

test('request', async (t: TestContext) => {
  const res = await request('https://www.yahoo.co.jp')

  t.assert.strictEqual(res, 'defualt response')
})

test('mocked request', async (t: TestContext) => {
  t.mock.method(globalThis, 'fetch', () => {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: async () => 'mocked response'
    } as Response)
  })

  const res = await request('https://www.yahoo.co.jp')

  t.assert.strictEqual(res, 'mocked response')
})
