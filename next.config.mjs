/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      ['next-superjson-plugin', {}]
    ]
  },
  images: {
    domains: ["picsum.photos", "wallpapers.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
