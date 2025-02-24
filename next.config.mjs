/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirect frontend `/api/*` calls
        destination: "http://127.0.0.1:5035/api/:path*", // To your backend
      },
    ];
  },
};

export default nextConfig;
