/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    }
};

export default nextConfig;
