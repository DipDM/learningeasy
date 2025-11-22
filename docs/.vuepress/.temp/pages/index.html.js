import comp from "/home/dmluffy/Work/vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Welcome to Learning Portal\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Welcome to Learning Portal\",\"heroImage\":\"/logo-main.png\",\"heroText\":\"Your Developer Learning Hub\",\"tagline\":\"SQL • LINQ • C# • .NET — Learn Everything in One Place\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"/get-started\",\"type\":\"primary\"},{\"text\":\"Explore SQL\",\"link\":\"/content/SQL/\",\"type\":\"secondary\"}]},\"headers\":[{\"level\":2,\"title\":\"💡 What Do You Want to Learn Today?\",\"slug\":\"💡-what-do-you-want-to-learn-today\",\"link\":\"#💡-what-do-you-want-to-learn-today\",\"children\":[]},{\"level\":2,\"title\":\"🚀 Why This Portal?\",\"slug\":\"🚀-why-this-portal\",\"link\":\"#🚀-why-this-portal\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
