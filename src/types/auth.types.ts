export type LoginCredentialsType = {
  email: string
  password: string
}

export type RegisterCredentialsType = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginCredentialsErrorType = {
  email: string[]
  password: string[]
}

export type RegisterCredentialsErrorType = {
  username: string[]
  email: string[]
  password: string[]
  confirmPassword: string[]
}
