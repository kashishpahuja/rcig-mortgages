// src/app/api/posts/route.js
import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "../../../lib/posts";
import { isAdmin } from "../../../lib/auth";

export async function GET(request) {
  const wantsDrafts = new URL(request.url).searchParams.get("drafts") === "1";
  const posts = await getAllPosts({ includeDrafts: wantsDrafts && (await isAdmin(request)) });
  return NextResponse.json({ posts });
}

export async function POST(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const post = await createPost(await request.json());
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
