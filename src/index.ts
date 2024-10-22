import { add } from './lib/calc.js'
import { request } from './lib/request.js'

async function main() {
  const result = add(1, 2)
  console.log(result)

  const yahoo = await request('https://www.yahoo.co.jp')
  console.log(yahoo)
}

main().catch(console.error)
