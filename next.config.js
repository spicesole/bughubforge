/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // appDir теперь включен по умолчанию в Next.js 14
}

module.exports = nextConfig 