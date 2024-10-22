export async function request(url: string) {
  const response = await fetch(url)
  const body = await response.text()
  return body
}
