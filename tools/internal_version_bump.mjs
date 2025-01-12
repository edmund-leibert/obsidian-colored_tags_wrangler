// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
function process_file(filepath, new_version = null, version_bump_type) {
	try {
		// Read the content of the JSON file
		const fileData = fs.readFileSync(filepath, 'utf8');
		const jsonData = JSON.parse(fileData);

		// If a new version is not provided,
		// 		determine the new version based on the bump type
		if (new_version === null) {
			const versionParts = jsonData.version.split('.').map(Number);

			switch (version_bump_type) {
				case 'full':
					versionParts[0]++; // Increment major version
					versionParts[1] = 0; // Reset minor version
					versionParts[2] = 0; // Reset patch version
					break;
				case 'change':
					versionParts[1]++; // Increment minor version
					versionParts[2] = 0; // Reset patch version
					break;
				case 'fix':
					versionParts[2]++; // Increment patch version
					break;
			}

			new_version = versionParts.join('.');
		}

		// Update the version in the JSON data and write to file
		jsonData.version = new_version;
		fs.writeFileSync(filepath, JSON.stringify(jsonData, null, 2));

		return new_version;
	} catch (err) {
		console.error(`Error processing ${filepath}:`, err);
		process.exit(1);
	}
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(dirname, '../package.json');
const manifestJsonPath = path.join(dirname, '../manifest.json');
const versionBumpType = process.argv[2];

if (!['full', 'change', 'fix'].includes(versionBumpType)) {
	console.error('Invalid version bump type. Use one of: full, change, fix.');
	process.exit(1);
}

let new_version = null;

new_version = process_file(packageJsonPath, new_version, versionBumpType);
new_version = process_file(manifestJsonPath, new_version,versionBumpType);

console.log(`Version bumped to ${new_version}`);
