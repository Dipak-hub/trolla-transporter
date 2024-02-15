export const getVersionCode = () => {
  const pkg = require('../../package.json');

  return pkg.version;
};
