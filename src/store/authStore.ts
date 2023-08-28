import { create } from "zustand"

import { loginUser, registerUser, changePassword } from "../service/auth"

import {
  LoginCredentialsType,
  RegisterCredentialsType,
  LoginCredentialsErrorType,
  RegisterCredentialsErrorType,
  CredentialsChangeType,
  CredentialsChangeErrorType,
} from "../types/auth.types"

interface AuthState {
  token: string | null // JSON web token
  username: string | null
  _id: string | null
  isLoggedIn: boolean // true if user is logged in, false is isn't
  accountType: string | null
  loginError: LoginCredentialsErrorType // stores errors for login's credentials
  registerError: RegisterCredentialsErrorType // stores errors for register's credentials
  changeCredentialsError: CredentialsChangeErrorType
  wasPasswordSuccessfullyChanged: boolean | null
  tokenExpirationDate: number
}

interface AuthActions {
  loginUser: (credentials: LoginCredentialsType) => void // function that logins user with the passed credentials
  registerUser: (credentials: RegisterCredentialsType) => void // function that registers user with the passed credentials
  changeCredentials: (credentials: CredentialsChangeType) => void // function to change user's password
  logoutUser: () => void // logs out user
  hasSessionExpired: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  _id: localStorage.getItem("_id") || null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  accountType: localStorage.getItem("accountType") || null,
  loginError: { email: [], password: [] },
  registerError: { username: [], email: [], password: [], confirmPassword: [] },
  changeCredentialsError: {
    password: [],
    newPassword: [],
    newUsername: [],
    newEmail: [],
  },
  wasUserRegistered: false,
  wasPasswordSuccessfullyChanged: null,
  tokenExpirationDate: Number(localStorage.getItem("tokenExpirationDate")) || 0,
  loginUser: async (credentials: LoginCredentialsType) => {
    try {
      // if login was successful

      const response = await loginUser(credentials)
      const data = response.data

      const token = data.token // getting newly created token
      const username = data.user.username // getting username of logged in user
      const _id = data.user._id
      const accountType = data.user.accountType

      const date = new Date()
      const tokenExpirationDate = Number(
        new Date(date.getTime() + 24 * 60 * 60 * 1000)
      )

      // saving data to localstorage
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("_id", _id)
      localStorage.setItem("accountType", accountType)
      localStorage.setItem(
        "tokenExpirationDate",
        tokenExpirationDate.toString()
      )

      // changing zustand's states
      return set(() => ({
        token: token,
        username: username,
        _id: _id,
        isLoggedIn: true,
        accountType: accountType,
        tokenExpirationDate: tokenExpirationDate,
      }))
    } catch (error: any) {
      // if login was unsuccessful

      // localStorage.removeItem("token")
      // localStorage.removeItem("username")

      return set(() => ({
        // token: null,
        // username: null,
        // isLoggedIn: false,
        loginError: {
          email: ["Invalid credentials"],
          password: ["Invalid credentials"],
        },
      }))
    }
  },
  registerUser: async (credentials: RegisterCredentialsType) => {
    try {
      // if registration was successful

      const response = await registerUser(credentials)
      const data = response.data

      // user is automatically logged in after registration
      const token = data.token // getting newly created token
      const username = data.user.username // getting username of logged in user
      const _id = data.user._id
      const accountType = data.user.accountType

      const date = new Date()
      const tokenExpirationDate = Number(
        new Date(date.getTime() + 24 * 60 * 60 * 1000)
      )

      // saving data to localstorage
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("_id", _id)
      localStorage.setItem("accountType", accountType)
      localStorage.setItem(
        "tokenExpirationDate",
        tokenExpirationDate.toString()
      )

      return set(() => ({
        token: token,
        username: username,
        _id: _id,
        isLoggedIn: true,
        accountType: accountType,
        tokenExpirationDate: tokenExpirationDate,
        registerError: {
          username: [],
          email: [],
          password: [],
          confirmPassword: [],
        },
        loginError: {
          email: [],
          password: [],
        },
      }))
    } catch (error: any) {
      // if registration was unsuccessful

      // change it later

      if (
        error.response.data.message === "User with this username already exists"
      ) {
        return set(() => ({
          registerError: {
            username: ["User with this username already exists"],
            email: [],
            password: [],
            confirmPassword: [],
          },
        }))
      }

      if (
        error.response.data.message === "User with this email already exists"
      ) {
        return set(() => ({
          registerError: {
            username: [],
            email: ["User with this email already exists"],
            password: [],
            confirmPassword: [],
          },
        }))
      }
    }
  },
  changeCredentials: async (credentials: CredentialsChangeType) => {
    try {
      const token = get().token

      if (!token) return

      const response = await changePassword(credentials, token)

      const data = response.data

      const username = data.user.username
      const _id = data.user._id

      localStorage.setItem("username", username)

      return set(() => ({
        username: username,
        _id: _id,
        wasPasswordSuccessfullyChanged: true,
        changePasswordError: {
          password: [],
          newPassword: [],
        },
      }))
    } catch (error: any) {
      console.log(error.response.data.message)

      if (error.response.data.message === "Invalid credentials") {
        return set(() => ({
          wasPasswordSuccessfullyChanged: false,
          changePasswordError: {
            password: ["incorrect password"],
            newPassword: [],
          },
        }))
      }
    }
  },
  logoutUser: () => {
    // resets values and removes token from localstorage

    localStorage.removeItem("token")
    localStorage.removeItem("_id")
    localStorage.removeItem("username")
    localStorage.removeItem("accountType")

    return set(() => ({
      token: null,
      username: null,
      _id: null,
      accountType: null,
      isLoggedIn: false,
      wasPasswordSuccessfullyChanged: null,
      changePasswordError: {
        password: [],
        newPassword: [],
      },
    }))
  },
  hasSessionExpired: () => {
    const isLoggedIn = get().isLoggedIn

    if (!isLoggedIn) return

    const currentDate = Number(new Date())
    const tokenExpirationDate = get().tokenExpirationDate
    const logoutUser = get().logoutUser

    if (currentDate >= tokenExpirationDate) {
      logoutUser()
      console.log("your session token has expired")
    }
  },
}))
