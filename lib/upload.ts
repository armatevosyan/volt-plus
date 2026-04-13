import { uploadBufferToR2 } from "@/lib/r2";

/**
 * Admin uploads go to Cloudflare R2 only (S3-compatible API).
 * Requires R2_* env vars — see .env.example.
 */
export async function uploadPublicImage(
  body: Buffer,
  contentType: string,
  originalName: string,
): Promise<string> {
  return uploadBufferToR2(body, contentType, originalName);
}
