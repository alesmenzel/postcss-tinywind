# Tinywind PostCSS plugin

PostCSS plugin that generates Tinywind classes.

## Installation

```sh
npm install --save-dev postcss @alesmenzel/postcss-tinywind
```

## Usage

Add the plugin to your PostCSS plugin configuration.

If you are using webpack, it could look like this:

```js
import layer from '@alesmenzel/postcss-layer-plugin'
import tinywind from '@alesmenzel/postcss-tinywind'

// your webpack config
return {
  // ...
  module: {
    rules: [
      {
        use: [
          {
            loader: 'css-loader',
            // css-loader options
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  layer({
                    layerName: 'base', // Default name is "default".
                  }),
                  tinywind()
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}
```
