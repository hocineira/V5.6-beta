// Système de logging intelligent pour production
const isDevelopment = process.env.NODE_ENV !== &apos;production&apos;;
const isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG_MODE === &apos;true&apos;;

export const logger = {
  debug: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.log(&apos;[DEBUG]&apos;, ...args);
    }
  },
  
  info: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.info(&apos;[INFO]&apos;, ...args);
    }
  },
  
  warn: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.warn(&apos;[WARN]&apos;, ...args);
    }
  },
  
  error: (...args) => {
    // Les erreurs sont toujours loggées
    console.error(&apos;[ERROR]&apos;, ...args);
  },
  
  rss: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.log(&apos;[RSS]&apos;, ...args);
    }
  }
};

export default logger;