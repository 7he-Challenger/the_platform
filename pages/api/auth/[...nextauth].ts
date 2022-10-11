import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import COOKIES_KEY from "~constantes/cookies";
import { setCookiesData } from "~lib/cookies";
import * as Auth from "~repositories/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      credentials: {
        username: {label: "username", type: "text", placeholder: "username"},
        password: { label: "Phpasswordne ", type: "text", placeholder: "password" },
      },
      async authorize(credentials, req) {
        try {
          const result: any = await Auth.login(
            credentials?.username as string | '', 
            credentials?.password as string | ''
          );
          return result
        } catch (error: any) {
          console.log('error', error)
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(data) {
      if (data) return true;

      return false;
    },
    async session({ session, token }: any) {
      session.user = token.user as any
      session.accessToken = token.accessToken as any;
      return session;
    },
    async jwt({ token, user, account }: any) {
      if(user){
        token.user = user.user
        token.accessToken = user.token
      }
      return token;
    },

      
      redirect({
        url,
        baseUrl
      }){
        return baseUrl
      }
  },
  // use env variable in production
  secret: "looselipssinkships",
  session: {
    maxAge: 3600,
    // strategy: 'database'
  }
});
