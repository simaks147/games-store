/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    apiKey: '902dfc59296e447c9d6930540b4a100d'
  },
  images: {
    domains: ['media.rawg.io']
  },
  reactStrictMode: false
};

export default nextConfig;
