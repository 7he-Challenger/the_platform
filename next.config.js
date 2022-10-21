/**
 *  @type {import('next').NextConfig} 
 **/

 const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    loader: 'akamai',
    path: '',
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

const configs = withTM(nextConfig)
module.exports = configs

