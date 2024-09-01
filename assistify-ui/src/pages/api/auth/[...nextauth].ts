import { refreshAccessToken, refreshInterval } from "@/auth/refreshAccessToken";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          access_type: "offline", // Request offline access to get a refresh token
          prompt: "consent", // Force the user to consent every time
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    /**
     * @param token - The current JWT token
     * @param account - The account object from the provider
     * @returns The updated JWT token
     */
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = refreshInterval; // Set token expiration time
        token.idToken = account.id_token;
      }

      // If the token is still valid, return it
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refresh the access token if it has expired
      return await refreshAccessToken(token);
    },
    /**
     * @param session - The current session object
     * @param token - The current JWT token
     * @returns The updated session object
     */
    async session({ session, token }): Promise<any> {
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
