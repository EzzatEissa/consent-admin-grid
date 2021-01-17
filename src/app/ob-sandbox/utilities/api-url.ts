import {Injectable} from '@angular/core';
import {ConfigurationUtil} from './configuration-util';

@Injectable()
export class ApiUrl {

  constructor(public configUtil: ConfigurationUtil) {
  }

  get(): string {
    let environmentType: string = this.configUtil.getProperty('environment.type');
    return this.configUtil.getProperty(environmentType + '.api.url');
  }
}
