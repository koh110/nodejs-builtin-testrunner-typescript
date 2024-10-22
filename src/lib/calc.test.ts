import { test, type TestContext, describe, it } from 'node:test'
import { setTimeout } from 'node:timers/promises'
import { readFile } from 'node:fs/promises'
import { add } from './calc.ts'

// seedファイルの読み込み
const { addSeeds } = JSON.parse(await readFile(new URL('./calc.test.seeds.json', import.meta.url), 'utf-8'))

test('add: 1 + 2', (t: TestContext) => {
  const result = add(1, 2)
  t.assert.deepStrictEqual(result, 3)
})

// seedを利用したテスト
describe('describe', { concurrency: true }, () => {
  for (const [ a, b, expected ] of addSeeds) {
    it(`add(${a}, ${b}) === ${expected}`, async (context: TestContext) => {
      await setTimeout(1000)
      const result = add(a, b)
      context.assert.deepStrictEqual(result, expected)
    })
  }
})

test('add from seeds: subtest concurrency', { concurrency: true }, async (t) => {
  const promises: Promise<unknown>[] = []
  for (const [ a, b, expected ] of addSeeds) {
    const p = t.test(`add(${a}, ${b}) === ${expected}`, async (context: TestContext) => {
      await setTimeout(1000)
      const result = add(a, b)
      context.assert.deepStrictEqual(result, expected)
    })
    promises.push(p)
  }
  await Promise.all(promises)
})
