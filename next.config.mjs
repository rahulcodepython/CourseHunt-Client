/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        RAZORPAY_KEY: process.env.RAZORPAY_KEY,
        BASE_API_URL_SERVER: process.env.BASE_API_URL_SERVER,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
    output: 'standalone',
    transpilePackages: ['next-mdx-remote'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: '',
                pathname: '/v0/b/z-tube-53cf1.appspot.com/**',
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: '',
                pathname: '/u/**',
            },
        ],
    },
};

export default nextConfig;
