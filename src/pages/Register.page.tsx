import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import {
  RegisterCredentialsType,
  RegisterCredentialsErrorType,
} from "../types/auth.types"

import { useAuthStore } from "../store/authStore"

import Page from "../components/UI/Page"
import Form from "../components/Form/Form"
import Input from "../components/Form/Input"

const Register = () => {
  const navigate = useNavigate()

  // credentials for login
  const [credentials, setCredentials] = useState<RegisterCredentialsType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // login errors
  const [credentialsError, setCredentialsError] =
    useState<RegisterCredentialsErrorType>({
      username: [],
      email: [],
      password: [],
      confirmPassword: [],
    })

  // getting values from store
  const [isLoggedIn, registerUser, registerError] = useAuthStore((state) => [
    state.isLoggedIn,
    state.registerUser,
    state.registerError,
  ])

  // register submit function
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault() // prevents default page reload after form is sent

    // checks if there are any errors, this function will terminate if there are
    if (
      credentialsError.username.length > 0 ||
      credentialsError.email.length > 0 ||
      credentialsError.password.length > 0 ||
      credentialsError.confirmPassword.length > 0
    )
      return

    // checking if any field is empty, if there are empty fields it will add error messages to empty fields and this function will be terminated
    if (
      credentials.username === "" ||
      credentials.email === "" ||
      credentials.password === "" ||
      credentials.confirmPassword === ""
    ) {
      const error = "this field should not be empty"

      // adding error message to any empty field
      if (credentials.username === "") {
        const usernameError = credentialsError.username

        // error won't be added if it was already added
        if (!usernameError.includes(error)) usernameError.push(error)

        setCredentialsError((prevState) => ({
          username: usernameError,
          email: prevState.email,
          password: prevState.password,
          confirmPassword: prevState.confirmPassword,
        }))
      }

      if (credentials.email === "") {
        const emailError = credentialsError.email

        if (!emailError.includes(error)) emailError.push(error)

        setCredentialsError((prevState) => ({
          username: prevState.username,
          email: emailError,
          password: prevState.password,
          confirmPassword: prevState.confirmPassword,
        }))
      }

      if (credentials.password === "") {
        const passwordError = credentialsError.password

        if (!passwordError.includes(error)) passwordError.push(error)

        setCredentialsError((prevState) => ({
          username: prevState.username,
          email: prevState.email,
          password: passwordError,
          confirmPassword: prevState.confirmPassword,
        }))
      }

      if (credentials.confirmPassword === "") {
        const confirmPasswordError = credentialsError.confirmPassword

        if (!confirmPasswordError.includes(error))
          confirmPasswordError.push(error)

        setCredentialsError((prevState) => ({
          username: prevState.username,
          email: prevState.email,
          password: prevState.password,
          confirmPassword: confirmPasswordError,
        }))
      }

      return
    }

    // checking if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      // change latter

      const error = "passwords do not match"

      const passwordError = credentialsError.password
      const confirmPasswordError = credentialsError.confirmPassword

      if (passwordError.includes(error))
        passwordError.splice(passwordError.indexOf(error), 1)
      if (confirmPasswordError.includes(error))
        confirmPasswordError.splice(confirmPasswordError.indexOf(error), 1)

      setCredentialsError((prevState) => ({
        username: prevState.username,
        email: prevState.email,
        password: [...prevState.password, error],
        confirmPassword: [...prevState.confirmPassword, error],
      }))

      return
    }

    registerUser(credentials)
  }

  // is used to change username credential
  const handleOnUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error: string[] = []

    const username = e.target.value

    if (username.length < 4) error.push("username is too short")
    if (username.length > 20) error.push("username is too long")

    setCredentialsError((prevState) => ({
      username: error,
      email: prevState.email,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
    setCredentials((prevState) => ({
      username: username,
      email: prevState.email,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  // is used to change email credential
  const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error: string[] = []

    const email = e.target.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) error.push("email needs to be valid")

    setCredentialsError((prevState) => ({
      username: prevState.username,
      email: error,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
    setCredentials((prevState) => ({
      username: prevState.username,
      email: e.target.value,
      password: prevState.password,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  // is used to change password credential
  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error: string[] = []

    const password = e.target.value

    if (password.length < 8)
      error.push("password must be longer than 8 characters")
    if (/(.)\1{3,}/.test(password))
      error.push("single character was user more than 3 times in a row")
    if (/^[a-zA-Z0-9\s]*$/.test(password))
      error.push("password should contain special characters")
    if (/^[^0-9]*$/.test(password)) error.push("password must include number")
    if (/^[^A-Z]*$/.test(password))
      error.push("password should have at least one uppercase latter")

    setCredentialsError((prevState) => ({
      username: prevState.username,
      email: prevState.email,
      password: error,
      confirmPassword: prevState.confirmPassword,
    }))
    setCredentials((prevState) => ({
      username: prevState.username,
      email: prevState.email,
      password: password,
      confirmPassword: prevState.confirmPassword,
    }))
  }

  // is used to change password confirmation credential
  const handleOnConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value

    setCredentialsError((prevState) => ({
      username: prevState.username,
      email: prevState.email,
      password: prevState.password,
      confirmPassword: [],
    }))
    setCredentials((prevState) => ({
      username: prevState.username,
      email: prevState.email,
      password: prevState.password,
      confirmPassword: confirmPassword,
    }))
  }

  // if the registration was unsuccessful (this username or email already exists) sets credentialsError state to this error
  useEffect(() => {
    setCredentialsError(registerError)
  }, [registerError])

  if (isLoggedIn) navigate("/")

  return (
    <Page className="h-full grid place-content-center mt-80 mx-auto max-w-7xl w-full p-2">
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          type="text"
          placeholder="username"
          value={credentials.username}
          onChange={handleOnUsernameChange}
          autoComplete="off"
          error={credentialsError.username}
        />
        <Input
          name="email"
          type="text"
          placeholder="email"
          value={credentials.email}
          onChange={handleOnEmailChange}
          autoComplete="off"
          error={credentialsError.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleOnPasswordChange}
          autoComplete="new-password"
          error={credentialsError.password}
        />
        <Input
          name="confirm password"
          type="password"
          placeholder="confirm password"
          value={credentials.confirmPassword}
          onChange={handleOnConfirmPasswordChange}
          autoComplete="new-password"
          error={credentialsError.confirmPassword}
        />
        <button className="bg-sp-main p-1 hover:opacity-90 transform-all ease-in-out duration-200">
          register
        </button>
        <Link
          to="../login"
          className="opacity-20 underline text-sm hover:opacity-30 ease-in-out duration-200 transition-all"
        >
          already have account? log in
        </Link>
      </Form>
    </Page>
  )
}
export default Register
