import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { generateBrundCrumb } from "~lib/format"

export type BrundCrumbType = {
  name: string,
  url: string
}

/**
 * logics brundrumb to set dynamic brundcrumb
 */
const useBrudcrumb = () => {
  const router = useRouter()
  /**
   * state brundcrumb
   * update everytime route change
   */
  const [brundCrumb, setBrundCrumb] = useState<BrundCrumbType[]>([])

  /**
   * on mounted get the pathname route
   * transform into nrundcrumb array
   */
  useEffect(() => {
    let brund = generateBrundCrumb(router.pathname)
    setBrundCrumb(brund)
    
  }, [router.pathname])

  return {
    brundCrumb
  }
}

export default useBrudcrumb