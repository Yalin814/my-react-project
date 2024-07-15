type ENV = 'development' | 'production'

export default {
  env: import.meta.env.MODE as ENV
}
