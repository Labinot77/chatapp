/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: ["picsum.photos", "wallpapers.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
