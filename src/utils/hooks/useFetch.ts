import { useState, useEffect } from "react"

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const json = await response.json()
        setData(json)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    }
  }, [url])

  return { data, isLoading, error }
}

export default useFetch
