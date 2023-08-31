import { useEffect, useState } from "react"

// changes document's (page's) title on passed value
export const useDocumentTitle = (
  title: string | undefined = "AXP"
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [documentTitle, setDocumentTitle] = useState<string>(title)
  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  return [documentTitle, setDocumentTitle]
}
