// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require("craco-less");
import path from "path";

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};
