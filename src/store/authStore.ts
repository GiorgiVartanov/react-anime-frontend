import { create } from "zustand"
import { Navigate } from "react-router-dom"

import { loginUser, registerUser, changePassword } from "../service/auth"

import {
  LoginCredentialsType,
  RegisterCredentialsType,
  LoginCredentialsErrorType,
  RegisterCredentialsErrorType,
  PasswordChangeType,
  PasswordChangeErrorType,
} from "../types/auth.types"

interface AuthState {
  token: string | null // JSON web token
  username: string | null
  isLoggedIn: boolean // true if user is logged in, false is isn't
  accountType: string | null
  loginError: LoginCredentialsErrorType // stores errors for login's credentials
  registerError: RegisterCredentialsErrorType // stores errors for register's credentials
  changePasswordError: PasswordChangeErrorType
  wasPasswordSuccessfullyChanged: boolean | null
  wasUserRegistered: boolean | null // true is registration was successful, false if wasn't
  tokenExpirationDate: number
}

interface AuthActions {
  loginUser: (credentials: LoginCredentialsType) => void // function that logins user with the passed credentials
  registerUser: (credentials: RegisterCredentialsType) => void // function that registers user with the passed credentials
  changePassword: (credentials: PasswordChangeType) => void // function to change user's password
  logoutUser: () => void // logs out user
  hasSessionExpired: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  accountType: localStorage.getItem("accountType") || null,
  loginError: { email: [], password: [] },
  registerError: { username: [], email: [], password: [], confirmPassword: [] },
  changePasswordError: { password: [], newPassword: [] },
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
      const accountType = data.user.accountType

      // saving them to localstorage

      const date = new Date()
      const tokenExpirationDate = Number(
        new Date(date.getTime() + 24 * 60 * 60 * 1000)
      )

      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("accountType", accountType)
      localStorage.setItem(
        "tokenExpirationDate",
        tokenExpirationDate.toString()
      )

      // changing zustand's states
      return set(() => ({
        token: data.token,
        username: data.user.username,
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

      return set(() => ({
        wasUserRegistered: true,
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
  changePassword: async (credentials: PasswordChangeType) => {
    try {
      const token = get().token

      if (!token) return

      const response = await changePassword(credentials, token)

      return set(() => ({
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
    localStorage.removeItem("username")
    localStorage.removeItem("accountType")

    return set(() => ({
      token: null,
      username: null,
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
