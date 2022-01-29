export async function GetJson<TResponse>(url: string): Promise<TResponse> {
  return (await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"
  })).json() as unknown as TResponse
}

export async function PostJson<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
  return (await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "same-origin",
    body: JSON.stringify(body)
  })).json() as unknown as TResponse
}