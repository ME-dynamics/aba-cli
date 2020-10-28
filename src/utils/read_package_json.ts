import { readJSONSync } from 'fs-extra';
import { switch_to_root } from './switch_to_root';






export function read_package_json() {
    switch_to_root();
    const root_path= process.cwd();
    const package_json = readJSONSync(`${root_path}/package.json`);
    return {
        name: package_json.name,
        dependencies: package_json.dependencies,
        devDependencies: package_json.devDependencies
    }
}