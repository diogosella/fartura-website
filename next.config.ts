import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.turismo.fartura.sp.gov.br",
        pathname: "/2025/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
