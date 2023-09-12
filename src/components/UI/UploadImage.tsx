import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"
import { useState } from "react"
import { motion } from "framer-motion"

import { profilePictureType } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import UserIcon from "../Person/UserIcon"
import Button from "./Button"

// const formData = new FormData()

const UploadImage = () => {
  const queryClient = useQueryClient()

  const [username, token] = useAuthStore((state) => [
    state.username,
    state.token,
  ])
  // const [formData, setFormData] = useState<FormData | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string>("")
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const postNewProfilePicture = async (): Promise<profilePictureType> => {
    const formData = new FormData()
    formData.append("file", file as Blob)

    return backendAjax.post("user/profilepicture", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
  }

  const mutation = useMutation({
    mutationFn: postNewProfilePicture,
    mutationKey: ["change picture"],
    onMutate: () => {
      queryClient.invalidateQueries(["profile-picture", username])
    },
    onSuccess: () => {
      toast.success("Profile picture successfully changed")
    },
    onError: () => {
      toast.error("something went wrong, try again latter")
    },
    onSettled: (res) => {
      if (!res) return

      const newData = res.data

      queryClient.setQueryData(["profile-picture", username], newData)
    },
  })

  const checkFile = (file: File) => {
    if (!file) {
      toast.error("image was not provided, try again")
      return
    }

    if (file.size > 1028 * 1028) {
      toast.error("image should be less then 1 megabyte size")
      return
    }

    const image = new Image()
    image.src = URL.createObjectURL(file)

    image.onload = () => {
      if (image.width > 1028 || image.height > 1028) {
        toast.error("image should be 1028x1028 or less")
        return
      }

      setImageSrc(image.src)
      setFile(file)
    }
  }

  const handleOnImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.currentTarget?.files?.[0]) return

    const file = e.currentTarget.files[0]

    checkFile(file)
  }

  const handleOnDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    if (!e.dataTransfer.files[0]) return

    const file = e.dataTransfer.files[0]

    checkFile(file)
  }

  const handleOnDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDragging(true)
  }

  const handleOnDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDragging(true)
  }

  const handleOnDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDragging(false)
  }

  const handleUploadImage = () => {
    setIsDragging(false)

    mutation.mutate()
  }

  const renderImage = () => {
    if (!imageSrc) return <></>

    return (
      <>
        <div className="relative w-fit mx-auto">
          <div
            style={{ height: "128px", width: "128px" }}
            className="absolute bg-gray-800"
          >
            <img
              height="128"
              width="128"
              src={imageSrc}
              alt=""
              className="absolute opacity-60 shadow-sm min-h-[128px] min-w-[128px] object-cover"
            />
          </div>
          <img
            height="128"
            width="128"
            src={imageSrc}
            alt=""
            className="rounded-full relative shadow-sm min-h-[128px] min-w-[128px] object-cover"
          />
        </div>
        <p className="opacity-20">
          only lighter part of the image will be seen
        </p>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 items-center max-w-[360px] w-full">
      <UserIcon username={username} />
      <motion.label
        initial={{ opacity: 1, borderColor: "transparent", borderWidth: 1 }}
        whileHover={{ opacity: 0.95 }}
        animate={{
          opacity: isDragging ? 0.8 : 1,
          borderColor: isDragging ? "#e91e63" : "transparent",
          transition: {
            duration: 0.1,
          },
        }}
        htmlFor="imageUpload"
        onDrop={handleOnDrop}
        onDragEnter={handleOnDragEnter}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        className={`dark:bg-sp-gray bg-sp-white p-2 border-2 w-full cursor-pointer`}
      >
        <p className="px-1 py-0.5 mb-3 opacity-50">select new image</p>
        <input
          onChange={handleOnImageInputChange}
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
        />
        {renderImage()}
      </motion.label>
      {file ? (
        <Button
          onClick={handleUploadImage}
          disabled={!file}
          className="px-1 py-0.5"
        >
          confirm
        </Button>
      ) : (
        ""
      )}
    </div>
  )
}
export default UploadImage
