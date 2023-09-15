import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { useAuthStore } from "../store/authStore"

import {
  CredentialsChangeType,
  CredentialsChangeErrorType,
} from "../types/auth.types"

import Page from "../components/UI/Page"
import Form from "../components/Form/Form"
import Input from "../components/Form/Input"
import Button from "../components/UI/Button"
import UploadImage from "../components/UI/UploadImage"

const Settings = () => {
  const navigate = useNavigate()

  const [
    isLoggedIn,
    changeCredentials,
    changeCredentialsError,
    changeCredentialsErrorMessage,
  ] = useAuthStore((state) => [
    state.isLoggedIn,
    state.changeCredentials,
    state.changeCredentialsError,
    state.changeCredentialsErrorMessage,
  ])

  const [credentials, setCredentials] = useState<CredentialsChangeType>({
    password: "",
    newPassword: "",
    newEmail: "",
    newUsername: "",
  })

  const [credentialsError, setCredentialsError] =
    useState<CredentialsChangeErrorType>({
      password: [],
      newPassword: [],
      newEmail: [],
      newUsername: [],
    })

  if (!isLoggedIn) navigate("/login")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (
      credentialsError.password.length > 0 ||
      credentialsError.newPassword.length > 0 ||
      credentialsError.newEmail.length > 0 ||
      credentialsError.newUsername.length > 0
    )
      return

    if (credentials.password.length === 0) return

    if (
      credentials.newPassword.length === 0 ||
      credentials.newEmail.length === 0 ||
      credentials.newUsername.length === 0
    )
      changeCredentials(credentials)
  }

  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentialsError(() => ({
      password: [],
      newPassword: [],
      newEmail: [],
      newUsername: [],
    }))
    setCredentials((prevState) => ({
      password: event.target.value,
      newPassword: prevState.newPassword,
      newEmail: prevState.newEmail,
      newUsername: prevState.newUsername,
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
      newEmail: prevState.newEmail,
      newUsername: prevState.newUsername,
    }))
    setCredentials((prevState) => ({
      password: prevState.password,
      newPassword: newPassword,
      newEmail: prevState.newEmail,
      newUsername: prevState.newUsername,
    }))
  }

  const handleOnNewEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const error: string[] = []

    const newEmail = event.target.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(newEmail)) error.push("email needs to be valid")

    setCredentialsError((prevState) => ({
      password: prevState.password,
      newPassword: prevState.newPassword,
      newEmail: error,
      newUsername: prevState.newUsername,
    }))
    setCredentials((prevState) => ({
      password: prevState.password,
      newPassword: prevState.newPassword,
      newEmail: newEmail,
      newUsername: prevState.newUsername,
    }))
  }

  const handleOnNewUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const error: string[] = []

    const newUsername = event.target.value

    if (newUsername.length < 4) error.push("username is too short")
    if (newUsername.length > 20) error.push("username is too long")

    setCredentialsError((prevState) => ({
      password: prevState.password,
      newPassword: prevState.newEmail,
      newEmail: prevState.newEmail,
      newUsername: error,
    }))
    setCredentials((prevState) => ({
      password: prevState.password,
      newPassword: prevState.newPassword,
      newEmail: prevState.newEmail,
      newUsername: newUsername,
    }))
  }

  const renderChangeCredentialsForm = () => {
    return (
      <Form
        onSubmit={handleSubmit}
        className="mt-8 mx-auto"
      >
        <Input
          name="new password"
          type="password"
          placeholder="new password"
          value={credentials.newPassword}
          onChange={handleOnNewPasswordChange}
          autoComplete="off"
          error={credentialsError.newPassword}
          className={
            credentials.newPassword.length > 0
              ? "opacity-100"
              : "opacity-70 focus:opacity-100 active:opacity-100"
          }
        />
        <Input
          name="new email"
          type="email"
          placeholder="new email"
          value={credentials.newEmail}
          onChange={handleOnNewEmailChange}
          error={credentialsError.newEmail}
          className={
            credentials.newEmail.length > 0
              ? "opacity-100"
              : "opacity-70 focus:opacity-100 active:opacity-100"
          }
        />
        <Input
          name="new username"
          type="text"
          placeholder="new username"
          value={credentials.newUsername}
          onChange={handleOnNewUsernameChange}
          autoComplete="off" // its not working
          error={credentialsError.newUsername}
          className={
            credentials.newUsername.length > 0
              ? "opacity-100"
              : "opacity-70 focus:opacity-100 active:opacity-100"
          }
        />
        <Input
          name="current password"
          type="password"
          placeholder="current password"
          value={credentials.password}
          onChange={handleOnPasswordChange}
          autoComplete="password"
          error={credentialsError.password}
        />
        <Button
          onClick={handleSubmit}
          className="p-1"
          disabled={
            credentialsError.password.length > 0 ||
            credentialsError.newPassword.length > 0 ||
            credentialsError.newEmail.length > 0 ||
            credentialsError.newUsername.length > 0 ||
            (credentials.password.length === 0 &&
              (credentials.newPassword.length === 0 ||
                credentials.newEmail.length === 0 ||
                credentials.newUsername.length === 0))
          }
        >
          change credentials
        </Button>
      </Form>
    )
  }

  useEffect(() => {
    if (changeCredentialsErrorMessage.length === 0) return

    toast.error(changeCredentialsErrorMessage)
    setCredentialsError(changeCredentialsError)
  }, [changeCredentialsError, changeCredentialsErrorMessage])

  return (
    <Page className="h-full max-w-7xl w-full p-2 mx-auto">
      <div className="flex gap-8 text-center items-center justify-center mt-8 flex-col">
        <section className="w-full">
          <h2 className="opacity-30">change profile picture</h2>
          <div className="h-0.5 w-full bg-sp-main mb-1"></div>
          <UploadImage className="mx-auto mt-6" />
        </section>
        <section className="w-full">
          <h2 className="opacity-30">change login information</h2>
          <div className="h-0.5 w-full bg-sp-main mb-1"></div>
          {renderChangeCredentialsForm()}
        </section>
      </div>
    </Page>
  )
}
export default Settings
