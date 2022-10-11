/**
 *  @type {import('next').NextConfig} 
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    loader: 'akamai',
    path: '',
  },
}

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM([
  nextConfig
])
