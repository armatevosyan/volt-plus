export function isCreateAdminAllowed(): boolean {
  return process.env.ALLOW_CREATE_ADMIN?.toLowerCase().trim() === "true";
}
