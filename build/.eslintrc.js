module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
  },
  "plugins": [],
  "rules": {
    "no-undef": [
      "error"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": 0,
    "no-console": 0,
    "no-mixed-spaces-and-tabs": 0
  },
  "globals": {
    "define": false,
    "$": false,
    "THREE": false
  }
};
