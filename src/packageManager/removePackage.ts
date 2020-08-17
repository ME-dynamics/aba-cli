
// import { jsonDB } from './jsonDB';
// import { packageCommand } from './packageCommand'

// export async function removePackage(packageName: string) {
//     const db = jsonDB();
//     const exists = db.get.packageExists(packageName);
//     if(!exists.status) throw new Error(`${packageName} is not installed`);
//     try {
//         await packageCommand({
//             mode: "remove",
//             packageManager: db.get.packageManager(),
//             packageName
//         });

//         if(exists.layer) db.remove(packageName, exists.layer);
        
//     } catch (error) {
//         throw error;
//     }
// }