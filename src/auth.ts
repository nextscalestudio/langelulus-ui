import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.email && profile.email === process.env.ADMIN_EMAIL) {
        token.role = 'admin'
      } else if (profile?.email) {
        token.role = 'user'
      }
      return token
    },
    session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as 'admin' | 'user'
      }
      return session
    },
  },
})
