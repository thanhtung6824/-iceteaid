// jest.config.js
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    transform: {
        ...tsjPreset.transform,
        '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
    globals: {
        'ts-jest': {
            babelConfig: true,
        }
    },
    // This is the only part which you can keep
    // from the above linked tutorial's config:
    cacheDirectory: '.jest/cache',
    setupFilesAfterEnv: [
        '<rootDir>/setupTests.js'
    ],
    'coverageThreshold': {
        'global': {
            'branches': 90,
            'functions': 97,
            'lines': 99,
            'statements': -10
        }
    },
    'coveragePathIgnorePatterns': [
        'node_modules',
        'dist',
        'mocks.ts',
        'constants.ts'
    ],
    moduleNameMapper: {
        'iceteaid-type/(.*)': '<rootDir>/packages/types/$1',
        'iceteaid-web/(.*)': '<rootDir>/packages/web/$1',
        'iceteaid-react-native/(.*)': '<rootDir>/packages/react-native/$1',
        'iceteaid-core/(.*)': '<rootDir>/packages/core/$1',
    }
};
