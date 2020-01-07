const { run } = require('runjs');

run("cross-env NODE_ENV=development TS_NODE_PROJECT=\"config/tsconfig-for-webpack-config.json\" webpack --config webpack.client.config.ts --profile --json > compiler.json")


