// src/lib/auth.js
import { cookies } from "next/headers";

// Matches your src/middleware.js: login sets admin_session = "authenticated"
async function hasAdminSession() {
  const store = await cookies();
  return store.get("admin_session")?.value === "authenticated";
}

export async function isAdmin(request) {
  const token = process.env.ADMIN_TOKEN;
  if (token && request.headers.get("x-admin-token") === token) return true; // curl / testing
  return hasAdminSession(); // logged-in admin panel
}