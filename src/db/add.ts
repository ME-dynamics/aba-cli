import { createHash } from 'crypto';
import { IBuildAdd, IAdd } from '../types';





export function buildAdd(args: IBuildAdd) {
    const { run } = args;
    return async function add(info: IAdd) {
        const { dev, layer, packageName, version } = info;
        const sha1 = createHash("sha1");
        const query = `insert into packages (id, name, version, dev, layer)
        values (?,?,?,?,?)`;
        const id = sha1.update(packageName).digest("hex");
        console.log(id);
        const params = [id, packageName, version, dev, layer];
        const res = await run(query, params);
        console.log(res)
        // TODO: check if package exists
    }
}