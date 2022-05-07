const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@shared': path.join(path.resolve(__dirname, './src/shared')),
    },
  },
}
