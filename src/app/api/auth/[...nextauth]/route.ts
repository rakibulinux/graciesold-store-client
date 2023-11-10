import { ShowMeToast } from "@/components/error";
import { toast, useToast } from "@/components/ui/use-toast";
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
  console.log(token.backendTokens.refreshToken);
  const response = await res.json();
  console.log("response", response.data);
  return {
    ...token,
    data: response,
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
        if (res.status == 401) {
          toast({
            title: res.statusText,
          });
          console.log(res.statusText);
          throw Error("Email Or Password not Match");
        }
        const user = await res.json();
        if (!user.data.user.isEmailVerified) {
          throw Error("Email is not verified. Please verify your email.");
        }
        return user.data;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      console.log(new Date().getTime() < token.backendTokens.expiresIn);
      return await refreshToken(token);
    },

    async session({ token, session, user }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
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
