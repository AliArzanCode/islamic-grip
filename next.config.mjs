/** @type {import('next').NextConfig} */
const nextConfig = {
    
    allowedDevOrigins:['192.168.1.6'],
     images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qccaprfgkwxiyyhzebud.supabase.co",
      },
    ],
  },

};

export default nextConfig;
