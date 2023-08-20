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

export const changePassword = (credentials: PasswordChangeType) =>
  backendAjax.post("/auth/reset", credentials)
