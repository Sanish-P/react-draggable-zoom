module.exports = function getEntryFile(environment) {
  let entryFile = {
    bundle: './src/index.tsx'
  }
  if(environment === 'production') {
    entryFile = {
      index: './src/lib/index.ts'
    }
  }
  return entryFile;
}