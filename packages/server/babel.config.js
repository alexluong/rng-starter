const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: true,
      },
      useBuiltIns: "usage",
    },
  ],
]

const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-transform-async-to-generator",
  [
    "module-resolver",
    {
      root: ["./src"],
    },
  ],
]

module.exports = { presets, plugins }
