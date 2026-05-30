export type HTTPClientResponse<T> = {
  data: T | null
  error: string | null
}

export class HTTPClient {
  static baseUrlAPI = 'http://localhost:3000'

  static async get<T>(endpoint: string): Promise<HTTPClientResponse<T>> {
    return this.request<T>(endpoint)
  }

  static async post<T>(endpoint: string, data: unknown): Promise<HTTPClientResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  private static async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<HTTPClientResponse<T>> {
    const url = `${this.baseUrlAPI}${endpoint}`

    try {
      const result = await fetch(url, options)
      const responseJSON = await result.json() as T

      return {
        data: responseJSON,
        error: null
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          data: null,
          error: error.message
        }
      }

      return {
        data: null,
        error: null
      }
    }
  }
}
