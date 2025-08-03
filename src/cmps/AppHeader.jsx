import { useState, useEffect } from "react"
import { AppHeaderFull } from "./AppHeaderFull"
import { AppHeaderMobile } from "./AppHeaderMobile"

export function AppHeader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 745)

  useEffect(() => {
    window.addEventListener("resize", handleMobileResize)

    function handleMobileResize() {
      setIsMobile(window.innerWidth < 745)
    }

    return () => {
      window.removeEventListener("resize", handleMobileResize)
    }
  }, [])

  return isMobile ? <AppHeaderMobile /> : <AppHeaderFull />
}
