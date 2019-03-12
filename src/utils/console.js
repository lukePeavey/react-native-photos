/**
 * Console methods that only log in development mode
 */
export default {
  /** Console group */
  log: (label, ...messages) => {
    if (__DEV__) {
      console.group(`${label}`)
      messages.forEach(message => console.log(message))
      console.groupEnd()
    }
  },
  /** Console warning */
  warn: (label, message) => {
    if (__DEV__) {
      console.warn(`${label}\n${message}`)
    }
  },
  /** Console error */
  error: (label, message) => {
    if (__DEV__) {
      console.error(`${label}\n${message}`)
    }
  },
}
