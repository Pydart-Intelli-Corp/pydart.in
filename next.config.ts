import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lactosure.azurewebsites.net/api',
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_sewzXr1rtc9PGp',
  },

  // Security headers for Razorpay integration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; frame-src https://api.razorpay.com;"
          }
        ]
      }
    ];
  },

  // Image domains (if you plan to use external images)
  images: {
    domains: [
      'images.unsplash.com',
      // Add domains for external images if needed
    ],
  },
};

export default nextConfig;
