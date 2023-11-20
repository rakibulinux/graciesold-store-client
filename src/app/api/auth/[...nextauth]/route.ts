import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

//RefreshToken
async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${Backend_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      authorization: token.backendTokens.refreshToken,
    },
  });
  const response = await res.json();
  const data = response.data.backendTokens;
  return {
    ...token,
    backendTokens: data,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "graciesold-store-api",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your_email@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw Error("Email Or Password not Match");
        }
        const { email, password } = credentials;
        const res = await fetch(`${Backend_URL}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        if (user?.error?.code === 404000) {
          throw Error(`User Doesn't exist in databases`);
        } else if (user?.data?.user?.isEmailVerified === false) {
          throw Error("Email is not verified. Please verify your email.");
        } else if (res?.status == 401) {
          throw Error("Credentials doesn't match!");
        } else {
          return user.data;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      let isRefreshing = false;
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      isRefreshing = true;
      try {
        const refreshedToken = await refreshToken(token);
        return refreshedToken;
      } finally {
        isRefreshing = false;
      }
    },

    async session({ token, session, user }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const getServerAuthSession = () => getServerSession(authOptions);
