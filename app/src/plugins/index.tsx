import { composeDecorators } from "@draft-js-plugins/editor"
// @ts-ignore
import createMarkdownShortcutsPlugin from "draft-js-md-keyboard-plugin"
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar"
import "@draft-js-plugins/inline-toolbar/lib/plugin.css"
import createResizeablePlugin from "@draft-js-plugins/resizeable"
import createImagePlugin from "@draft-js-plugins/image"
import "@draft-js-plugins/image/lib/plugin.css"
import createMentionPlugin from "@draft-js-plugins/mention"
import "@draft-js-plugins/mention/lib/plugin.css"
// @ts-ignore
import Prism from "prismjs"
// @ts-ignore
import "prismjs/themes/prism.css"
// @ts-ignore
import createPrismPlugin from "draft-js-prism-plugin"
import createFocusPlugin from "@draft-js-plugins/focus"

import "prismjs/components/prism-java"
import "prismjs/components/prism-python"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-git"
import "prismjs/components/prism-ignore"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-properties"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-regex"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-yaml"

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionTrigger: "```",
  mentionPrefix: "```",
  theme: {},
  mentionComponent(mentionProps) {
    return (
      <>
        {mentionProps.children}
      </>
    )
  }
})

const { MentionSuggestions } = mentionPlugin

const focusPlugin = createFocusPlugin()

const resizeablePlugin = createResizeablePlugin()

var prismPlugin = createPrismPlugin({
  prism: Prism
})

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator
)

const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin

const imagePlugin = createImagePlugin({ decorator })

const Plugins = () => {
  const mdPlugin = createMarkdownShortcutsPlugin()

  return {
    plugins: [inlineToolbarPlugin, imagePlugin, resizeablePlugin, mdPlugin, prismPlugin, mentionPlugin, focusPlugin],
    InlineToolbar,
    MentionSuggestions
  }
}

export default Plugins