import { getSession, useSession } from "next-auth/react"

/**
 * server side props get toke 
 */
export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)
  // the token to send in axios instance
  const token = session.accessToken
}

/**
 * get token in component on client side 
 */
export const Component = () => {
  const { data, status } = useSession()
  const token = data?.accessToken
}