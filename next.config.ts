import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { basePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
