const fs = require('fs');
const semver = require('semver');

// Read the current package.json file
const packageJsonPath = '../package.json';
const packageJson = require(packageJsonPath);

// Determine the new version (patch, minor, major)
const newVersion = semver.inc(packageJson.version, 'patch'); // You can change 'patch' to 'minor' or 'major'

// Update the package.json with the new version
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Bumped version to ${newVersion}`);