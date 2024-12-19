/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        RAZORPAY_KEY: process.env.RAZORPAY_KEY,
        BASE_API_URL_SERVER: process.env.BASE_API_URL_SERVER,
    },
    output: 'standalone',
    transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
