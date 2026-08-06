// Ma'lumot yuklab beradigan hook. reload() bilan qaytadan yuklaymiz.
import { useCallback, useEffect, useState } from 'react'

export function useFetch(loader, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const run = useCallback(async () => {
    setLoading(true)
    try {
      setData(await loader())
      setError('')
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
  }, [run])

  return { data, loading, error, reload: run }
}
