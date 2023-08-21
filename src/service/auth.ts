import backendAjax from "./backendAjax"

import {
  LoginCredentialsType,
  RegisterCredentialsType,
  PasswordChangeType,
} from "../types/auth.types"

export const loginUser = (credentials: LoginCredentialsType) =>
  backendAjax.post("/auth/login", credentials) // logs in user with the passed data

export const registerUser = (credentials: RegisterCredentialsType) =>
  backendAjax.post("/auth/register", credentials) // registers user with the passed data

export const changePassword = (
  credentials: PasswordChangeType,
  token: string
) =>
  backendAjax.post("/auth/reset", credentials, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
