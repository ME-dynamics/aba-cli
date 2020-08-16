import {Command, flags} from '@oclif/command';
const {child, exec} = require('child_process');

export default class Audit extends Command {
  static flags = {
    verbose: flags.boolean({char: 'v', description: 'Shows dependencies vulnerabilities in JSON format as well as response data'}),
    json: flags.boolean({char: 'j', description: 'Shows dependencies vulnerabilities in JSON format'}),
    level: flags.string({char: 'l', description: 'shows vulnerabilities impact level, low, medium, high etc.', default: 'info'}),
    groups: flags.string({char: 'g', description: 'Applying the groups flag will limit the audit table to vulnerabilities of the corresponding dependency groups (e.g dependencies,devDependencies)'}),
  }

  async run(){
    const {flags, args} = this.parse(Audit);
    let command:string = 'yarn audit ';
    if(flags.level) command += `--level ${flags.level} `;
    if(flags.json) command += '--json ';
    if(flags.verbose) command += '--verbose ';
    if(flags.groups) command += `--groups ${flags.groups} `;

    let audit = exec(command, (error:any, stdout:any, stdin: any) => {
      if(error) this.log(error);
      this.log(stdout); //show output & dependency result
      //TODO: format stdout to a better look & feel.
    });

    audit.on('exit', (code: number)=> {
      this.log('process exited with code: ' + code);
    })
  }
}
