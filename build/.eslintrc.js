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
    "no-mixed-spaces-and-tabs": 0,
    "react/prop-types": 0,

    // We should consider fixing these errors and reinstating these rules
    // These are all easy quick fixes
    "no-extra-boolean-cast": 0,
    "no-empty": 0,
    "no-constant-condition": 0,
    "no-case-declarations": 0,
    "no-unreachable": 0,
  },
  "globals": {
    "define": false,
    "$": false,
    "THREE": false
  }
};
