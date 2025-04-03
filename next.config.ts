import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    domains:[
      'images.prismic.io',
      "media.geeksforgeeks.org",
      "www.mindinventory.com",
      "www.janets.org.uk",
      "media.licdn.com",
      "riseuplabs.com",
      "img.freepik.com"
    ]
  },
  // output:"standalone"
};

export default nextConfig;
