/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  output: "export",
  reactCompiler: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;