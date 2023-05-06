/* eslint-disable no-undef*/
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["/src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "*": ["src/*"],
            tests: ["./tests/"],
            "@atoms": "./src/components/atoms",
            "@molecules": "./src/components/molecules",
            "@organisms": "./src/components/organisms",
            "@templates": "./src/components/templates",
            "@screens": "./src/components/screens",
            "@helpers": "./src/helpers",
            "@interfaces": "./src/interfaces",
            "@navigations": "./src/navigations",
            "@yupSchemas": "./src/yupSchemas",
            "@api": "./src/api",
            "@context": "./src/context",
          },
        },
      ],
    ],
  };
};
