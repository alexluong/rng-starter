import { configure } from "@storybook/react"
import { setDefaults } from "@storybook/addon-info"

setDefaults({
  inline: true,
})

const req = require.context("../src", true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
