import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { uploadBufferToR2 } from "@/lib/r2";

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180);
  return base || "file";
}

/**
 * Dev (`next dev`): files under `public/uploads/`, URL `/uploads/...`.
 * Production / deployed: Cloudflare R2 via S3 API.
 */
export async function uploadPublicImage(
  body: Buffer,
  _contentType: string,
  originalName: string,
): Promise<string> {
  if (process.env.NODE_ENV === "development") {
    const name = `${randomUUID()}-${sanitizeFilename(originalName)}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), body);
    return `/uploads/${name}`;
  }

  return uploadBufferToR2(body, _contentType, originalName);
}
