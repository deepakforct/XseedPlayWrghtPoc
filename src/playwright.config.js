module.exports = {
    timeout: 50000,
    use: {
      // Browser options
      headless: false,
      slowMo: 100,
  
      // Context options
      viewport: { width: 1366, height: 768 },
      ignoreHTTPSErrors: true,
  
      // Artifacts
      screenshot: 'only-on-failure',
     // video: 'retry-with-video',
    },
  };