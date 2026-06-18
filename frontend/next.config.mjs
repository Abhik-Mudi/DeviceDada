/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // This matches any request starting with /api/ from your frontend
        source: '/api/:path*', 
        
        // This forwards the request to your Express backend
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/:path*`, 
      },
    ]
  },
};

export default nextConfig;
