import { useRef, useEffect } from 'react'

export function usePreviousValue<T>(currentValue: T): T {
  const previousValueRef = useRef<T>(currentValue)

  const previousValue = previousValueRef.current

  useEffect(() => {
    if (currentValue !== previousValueRef.current) {
      previousValueRef.current = currentValue
    }
  }, [currentValue])

  return previousValue
}
