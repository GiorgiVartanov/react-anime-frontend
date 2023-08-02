import ajax from "./ajax"

import {
  LoginCredentialsType,
  RegisterCredentialsType,
} from "../types/auth.types"

export const loginUser = (credentials: LoginCredentialsType) =>
  ajax.post("/auth/login", credentials) // logs in user with the passed data

export const registerUser = (credentials: RegisterCredentialsType) =>
  ajax.post("/auth/register", credentials) // registers user with the passed data
