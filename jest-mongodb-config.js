module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest"
    },
    binary: {
      version: "3.5.2", // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
};
