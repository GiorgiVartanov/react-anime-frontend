import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  LoginCredentialsType,
  LoginCredentialsErrorType,
} from "../types/auth.types"

import { useAuthStore } from "../store/authStore"

import Form from "../components/Form/Form"
import Input from "../components/Form/Input"

const Login = () => {
  const navigate = useNavigate()

  // credentials used for logging in
  const [credentials, setCredentials] = useState<LoginCredentialsType>({
    email: "",
    password: "",
  })

  // stores credential's errors
  const [credentialsError, setCredentialsError] =
    useState<LoginCredentialsErrorType>({
      email: [],
      password: [],
    })

  // getting data from store
  const [isLoggedIn, loginUser, loginError] = useAuthStore((state) => [
    state.isLoggedIn,
    state.loginUser,
    state.loginError,
  ])

  // login submit function
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault() // prevents browser from reloading page after login form is submitted

    loginUser(credentials) // logs user with the passed credentials
  }

  // changes username credentials
  const handleOnUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentialsError(() => ({
      email: [],
      password: [],
    }))
    setCredentials((prevState) => ({
      email: event.target.value,
      password: prevState.password,
    }))
  }

  // changes password credentials
  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentialsError(() => ({
      email: [],
      password: [],
    }))
    setCredentials((prevState) => ({
      email: prevState.email,
      password: event.target.value,
    }))
  }

  // sets credentials error if they where incorrect (email and passwords do not match)
  useEffect(() => {
    setCredentialsError(loginError)
  }, [loginError])

  // redirects user
  useEffect(() => {
    if (!isLoggedIn) return

    navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full grid place-content-center mt-80 mx-auto max-w-7xl w-full p-2"
    >
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="email or username"
          value={credentials.email}
          onChange={handleOnUsernameChange}
          error={credentialsError.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleOnPasswordChange}
          error={credentialsError.password}
        />
        <button className="bg-sp-main p-1 hover:opacity-90 transform-all ease-in-out duration-200">
          login
        </button>
        <Link
          to="../register"
          className="opacity-20 underline text-sm hover:opacity-30 ease-in-out duration-200 transition-all"
        >
          don't have account yet? register
        </Link>
      </Form>
    </motion.div>
  )
}
export default Login
