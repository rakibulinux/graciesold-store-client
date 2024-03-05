/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "www.pinclipart.com",
        pathname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/api/v1/files/**",
      },
      {
        protocol: "https",
        hostname: "www.europeanbusinessreview.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "smartdata.tonytemplates.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "cdn.openai.com",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "s3-media2.fl.yelpcdn.com",
        pathname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
