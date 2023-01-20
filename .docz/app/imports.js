export const imports = {
  'documentation.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "documentation" */ 'documentation.mdx'),
}
