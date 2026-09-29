// src/app/api/posts/[slug]/route.js
import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "../../../../lib/posts";
import { isAdmin } from "../../../../lib/auth";

export async function GET(request, { params }) {
  const { slug } = await params;
  const post = await getPost(slug, { includeDrafts: await isAdmin(request) });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request, { params }) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const post = await updatePost(slug, await request.json());
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const ok = await deletePost(slug);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ deleted: true });
}
