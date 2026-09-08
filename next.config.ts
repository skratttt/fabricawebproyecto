import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Avoid PDF.js's internal webpack identifiers colliding with Next's dev wrapper.
    config.resolve.alias["pdfjs-dist$"] = "pdfjs-dist/build/pdf.min.mjs";
    return config;
  },
  async redirects() {
    return [
      {
        source: "/el-equipo",
        destination: "/",
        permanent: true,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      // Instagram CDN (real post images)
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      // Sanity image CDN (columna mainImage)
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
