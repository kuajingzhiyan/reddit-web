/** node-api-service 统一响应体 */
export interface ApiResponse<T> {
  data: T
}

export interface ApiErrorBody {
  message?: string
  errors?: Record<string, string[] | undefined>
}

export function getApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object')
    return null

  const fetchError = error as {
    data?: ApiErrorBody
    statusMessage?: string
  }

  return fetchError.data?.message || fetchError.statusMessage || null
}
