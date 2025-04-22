import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

export default createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
  moduleNameMapper:{
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@components/(.*)$": "<rootDir>/src/Components/$1",
    "^@index/(.*)$": "<rootDir>/src/Components/index/$1",
    "^@product/(.*)$": "<rootDir>/src/Components/product/$1",
    "^@auth/(.*)$": "<rootDir>/src/Components/auth/$1",
    "^@contracts/(.*)$": "<rootDir>/src/contracts/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@panel/(.*)$": "<rootDir>/src/Components/panel/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1"
  }
})
