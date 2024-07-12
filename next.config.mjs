/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    }
};

export default nextConfig;
