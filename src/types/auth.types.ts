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

export type CredentialsChangeType = {
  password: string
  newPassword: string
  newEmail: string
  newUsername: string
}

export type CredentialsChangeErrorType = {
  password: string[]
  newPassword: string[]
  newEmail: string[]
  newUsername: string[]
}
