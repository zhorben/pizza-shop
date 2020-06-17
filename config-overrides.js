module.exports = function override(config, env) {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.module\.scss$/,
      use: ['sass-loader']
    },
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: { extension: '.module.scss' }
        }
      ]
    }
  ]

  return config
}
