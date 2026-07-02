import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
