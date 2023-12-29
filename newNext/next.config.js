module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: `https://scaling.com.au/api/:path*`,
        // destination: `http://localhost:4001/api/:path*`,
        destination: `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/:path*`,
      }
    ]
  },
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'supports-color': 'commonjs supports-color',
    })
    return config;
  },
};
