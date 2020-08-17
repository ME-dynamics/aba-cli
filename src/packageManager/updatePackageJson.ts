import { cli } from 'cli-ux';
import { readJSONSync, writeJSONSync } from 'fs-extra';
import { join } from 'path';


export async function updatePackageJson(path: string, serviceName: string) {
    const repo = await cli.prompt("project git repository");
    // TODO: put some validation for url;
    const author = await cli.prompt("project's author name", {required: true});
    const packageJsonPath = join(path, 'package.json');
    let pJson: any;
    try {
        pJson = readJSONSync(packageJsonPath);    
    } catch (error) {
        throw new Error(`error in reading json, info: ${error}`);
    }
    
    if(repo){
        pJson.repository = repo;
    } else {
        pJson.repository = "FILL ME";
    }
    pJson.name = serviceName;
    pJson.description = `${serviceName} service with clean architecture`;
    pJson.author = author;
    try {
        writeJSONSync(packageJsonPath, pJson, {spaces: 2})       
    } catch (error) {
        throw error;
    }
 

}