module.exports = {
  get NODE_ENV() {
    return process.env.NODE_ENV
  },

  isDevelopment() {
    return this.NODE_ENV === 'development'
  },

  isStaging() {
    return this.NODE_ENV === 'staging'
  },

  isProduction() {
    return this.NODE_ENV === 'production'
  }
};
