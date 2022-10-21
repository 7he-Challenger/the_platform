import { signOut } from "next-auth/react"

export const logOut = () => {
  signOut({
    callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}login`
  })
}