import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {

        const { username, password } = credentials as any
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          })
        })
        const user = await res.json()
        console.log('USER: ', user)
        if (res.ok && user) {
          console.table(user)
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt ({ token, user }) {
      return { ...token, ...user };
    },
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: '/auth/login/'
  }
})

export { handler as GET, handler as POST }