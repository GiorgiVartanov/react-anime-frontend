import { useEffect, useState } from "react"

// changes document's (page's) title on passed value
export const useDocumentTitle = (title: string) => {
  const [documentTitle, setDocumentTitle] = useState(title)
  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  return [documentTitle, setDocumentTitle]
}
