const cssLoaderConfig = require('@thornfe/next-css/css-loader-config');

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { dev, isServer } = options;
      const { cssModules, cssLoaderOptions, postcssLoaderOptions, lessLoaderOptions = {}, styleResourceLoaderOptions = [] } = nextConfig;

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions,
          },
          ...styleResourceLoaderOptions,
        ],
      });

      if (cssModules) {
        options.defaultLoaders.less.unshift('@ecomfe/class-names-loader');
      }

      config.module.rules.push({
        test: /\.less$/,
        use: options.defaultLoaders.less,
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
