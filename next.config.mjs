/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/public/home',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
