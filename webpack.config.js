const path = require('path');

module.exports = {
    // ... other webpack configuration options ...

    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-http"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
        },
    },

    // ... other webpack configuration options ...
};
