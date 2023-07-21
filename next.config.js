/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: [
      "en",
      "es",
      "zh",
      "hi",
      "ar",
      "pt",
      "bn",
      "ru",
      "ja",
      "vi",
      "fr",
      "de",
      "ko",
      "tr",
      "it",
      "th",
      "uk",
      "id",
      "pl",
      "nl",
      "te",
      "ro",
      "fa",
      "cs",
      "hu",
      "sv",
      "da",
      "fi",
      "el",
      "ta",
      "he",
      "no",
      "sk",
      "sl",
      "lt",
      "et",
      "lv",
      "hr",
      "sr",
      "bg",
      "ms",
    ],
    defaultLocale: "en",
    localeDetection: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/category/movies",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
