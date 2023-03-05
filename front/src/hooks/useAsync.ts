import { DependencyList, useCallback, useEffect, useState } from "react"

export const useAsync = <T>(cb: () => Promise<T>, deps: DependencyList = []) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const [value, setValue] = useState<T>()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    cb()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, deps)

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
  // as
  //   | {
  //       //initial
  //       loading: true
  //       error: undefined
  //       value: undefined
  //     }
  //   | {
  //       // success
  //       loading: false
  //       error: undefined
  //       value: T
  //     }
  //   | {
  //       // error
  //       loading: false
  //       error: Error
  //       value: undefined
  //     }
}
