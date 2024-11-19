export default = {
  server: {
    proxy: {
      '/api': {
        target: 'https://filipvrba.vercel.app',
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}