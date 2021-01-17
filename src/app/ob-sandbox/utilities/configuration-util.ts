import {Injectable} from '@angular/core';

@Injectable()
export class ConfigurationUtil {

  constructor() {
  }

  public getProperty(propertyName: string): any {

    if (window.sessionStorage.getItem('config') != null) {
      let configStr = window.sessionStorage.getItem('config');
      let config = JSON.parse(configStr);
      let propertyValue = null;
      try {
        propertyValue = config[propertyName];
      } catch {
      }
      return propertyValue;
    } else {
      let configStr = window.localStorage.getItem('config');
      let config = JSON.parse(configStr);
      let propertyValue = null;
      try {
        propertyValue = config[propertyName];
      } catch {
      }
      return propertyValue;
    }

  }

}
