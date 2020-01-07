export const { run } = require('runjs');

run("cross-env NODE_ENV=development TS_NODE_PROJECT=\"config/tsconfig-for-webpack-config.json\" webpack --config webpack.server.config.ts");
