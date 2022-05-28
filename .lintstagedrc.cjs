module.exports = {
  '**/*': ['prettier --ignore-unknown --write'],
  '**/*.ts?(x)': [
    'eslint --cache --quiet',
    () => 'tsc -p tsconfig.json',
    () => 'vitest --run',
  ],
}
