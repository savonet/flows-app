import useSWR from "swr"
import { stringOfError } from "@flows/lib/utils"

type ApiResponse<T> =
  | {
      status: "loading"
    }
  | { status: "error"; error: string }
  | { status: "loaded"; data: T }

export const BASE_URL =
  process?.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://flows-api.liquidsoap.info"

type ApiQueryArgs = {
  method: "GET" | "POST" | "PUT" | "DELETE"
  payload?: unknown
}

export class ApiError extends Error {
  constructor(public info: unknown, public status: number, message: string) {
    super(message)
    this.info = info
    this.status = status
  }
}

export async function apiQuery<T>(path: string, { method, payload }: ApiQueryArgs): Promise<T> {
  const resp = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  })

  const json = await resp.json()

  if (!resp.ok) {
    throw new ApiError(json, resp.status, "API error")
  }

  return json
}

export function useApiQuery<T>(path: string): ApiResponse<T> {
  const { data, error } = useSWR<T>(path)

  if (!data) {
    return error ? { status: "error", error: stringOfError(error) } : { status: "loading" }
  }

  return { status: "loaded", data }
}
