import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/authStore"

import {
  PasswordChangeType,
  PasswordChangeErrorType,
} from "../types/auth.types"

import Form from "../components/Form/Form"
import Input from "../components/Form/Input"
import Button from "../components/UI/Button"

const Settings = () => {
  const navigate = useNavigate()

  const [isLoggedIn, changePassword, changePasswordError] = useAuthStore(
    (state) => [
      state.isLoggedIn,
      state.changePassword,
      state.changePasswordError,
    ]
  )

  const [credentials, setCredentials] = useState<PasswordChangeType>({
    password: "",
    newPassword: "",
  })

  const [credentialsError, setCredentialsError] =
    useState<PasswordChangeErrorType>({
      password: [],
      newPassword: [],
    })

  if (!isLoggedIn) navigate("/login")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    changePassword(credentials)
  }

  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentialsError(() => ({
      password: [],
      newPassword: [],
    }))
    setCredentials((prevState) => ({
      password: event.target.value,
      newPassword: prevState.newPassword,
    }))
  }

  const handleOnNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const error: string[] = []

    const newPassword = event.target.value

    if (newPassword.length < 8)
      error.push("password must be longer than 8 characters")
    if (/(.)\1{3,}/.test(newPassword))
      error.push("single character was user more than 3 times in a row")
    if (/^[a-zA-Z0-9\s]*$/.test(newPassword))
      error.push("password should contain special characters")
    if (/^[^0-9]*$/.test(newPassword))
      error.push("password must include number")
    if (/^[^A-Z]*$/.test(newPassword))
      error.push("password should have at least one uppercase latter")

    setCredentialsError((prevState) => ({
      password: prevState.password,
      newPassword: error,
    }))
    setCredentials((prevState) => ({
      password: prevState.password,
      newPassword: newPassword,
    }))
  }

  useEffect(() => {
    setCredentialsError(changePasswordError)
  }, [changePasswordError])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-7xl w-full p-2 h-full"
    >
      <Form onSubmit={handleSubmit}>
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
          name="new password"
          type="password"
          placeholder="new password"
          value={credentials.newPassword}
          onChange={handleOnNewPasswordChange}
          autoComplete="new-password"
          error={credentialsError.newPassword}
        />
        <Button onClick={handleSubmit}>change password</Button>
      </Form>
    </motion.div>
  )
}
export default Settings