/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      { source: "/index.php/elementor-37", destination: "/journey", permanent: true },
      { source: "/index.php/sample-page", destination: "/", permanent: true },
      { source: "/index.php/:path*", destination: "/", permanent: true },
    ];
  },
};
