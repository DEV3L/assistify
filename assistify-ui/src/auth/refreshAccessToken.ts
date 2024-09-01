import { JWT } from "next-auth/jwt";

const secondsInHour = 3600; // Number of seconds in an hour
const hoursInADay = 24; // Number of hours in a day
const millisecondsInASecond = 1000; // Number of milliseconds in a second

// Refresh interval set to 24 hours in milliseconds
export const refreshInterval =
  hoursInADay * secondsInHour * millisecondsInASecond;

/**
 * Refreshes the access token using the refresh token.
 * @param token - The JWT token containing the refresh token.
 * @returns The updated JWT token with a new access token.
 */
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      throw new Error("Refresh token is missing");
    }

    // Construct the URL for the token refresh request
    const url = new URL("https://oauth2.googleapis.com/token");
    url.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
    url.searchParams.append("refresh_token", token.refreshToken);
    url.searchParams.append("grant_type", "refresh_token");

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("Response status:", response.status); // Log the response status
      console.error("Response body:", refreshedTokens); // Log the response body
      throw new Error("Failed to refresh access token");
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token, // New access token
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Expiry time of the new access token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // New refresh token or the old one if not provided
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError", // Error attribute indicating refresh failure
    };
  }
}
