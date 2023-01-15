import { useEffect, useLayoutEffect } from 'react'

// This resolves the issue with react code generation, whether it occurs on the server (without the window api) or in the browser.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
