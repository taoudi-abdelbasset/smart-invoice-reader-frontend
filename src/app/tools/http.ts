import { SERVER_URL } from "../config/env";
import { TokenStorage } from "./tokenStorage";

export default async function http<T>(path: string, request: RequestInit = {}) {
  const token = TokenStorage.get();
  const isForm = request.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(request.headers as Record<string, string>),
  };

  if (!isForm && request.body) headers["Content-type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const req = await fetch(`${SERVER_URL}${path}`, { ...request, headers });

  if (req.status === 401) {
    TokenStorage.clear();
    window.location.assign("/login");
  }
  if (!req.ok)
    throw new Error(
      `Request failed: ${req.status}, Path: ${SERVER_URL}${path}`,
    );
  if (req.status === 204) return undefined as T;
  return await req.json();
}
