// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectMongo();
    const { username, password } = await request.json();

    // Auto-seed default admin if database table is completely empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('caledon2026', salt);
      await Admin.create({ username: 'admin', passwordHash: hashedPassword });
    }

    // Find admin user in DB
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Securely compare password hash
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Set secure HTTP-only session cookie using Next.js 15+ standard async cookies API
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_session',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// // src/app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import connectMongo from '@/lib/mongodb';
// import Admin from '@/models/Admin';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     await connectMongo();
//     const { username, password } = await request.json();

//     // Auto-seed default admin if database table is completely empty
//     const adminCount = await Admin.countDocuments();
//     if (adminCount === 0) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash('caledon2026', salt);
//       await Admin.create({ username: 'admin', passwordHash: hashedPassword });
//     }

//     // Find admin user in DB
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
//     }

//     // Securely compare password hash
//     const isMatch = await bcrypt.compare(password, admin.passwordHash);
//     if (!isMatch) {
//       return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
//     }

//     // Set secure HTTP-only session cookie (Awaiting cookies() for Next.js compatibility)
//     const cookieStore = await cookies();
//     cookieStore.set({
//       name: 'admin_session',
//       value: 'authenticated',
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24, // 1 day
//       path: '/',
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Login Server Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }