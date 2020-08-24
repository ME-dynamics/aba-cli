import { readJSONSync } from 'fs-extra';
import { switchToRoot } from './switchToRoot';






export function readPackageJson() {
    switchToRoot();
    const rootPath= process.cwd();
    const packageJson = readJSONSync(`${rootPath}/package.json`);
    return {
        name: packageJson.name,
        dependencies: packageJson.dependencies,
        devDependencies: packageJson.devDependencies
    }
}