import type { NextConfig } from "next";

if (
  process.env.VERCEL === "1" &&
  !process.env.NEXTAUTH_SECRET?.trim() &&
  !process.env.AUTH_SECRET?.trim()
) {
  throw new Error(
    "NEXTAUTH_SECRET or AUTH_SECRET must be set in Vercel → Settings → Environment Variables (then redeploy). Without it, /api/auth/* returns 500 in production.",
  );
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
