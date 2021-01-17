import {Component, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'sbm-app',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  constructor(translate: TranslateService, private http: HttpClient) {
    translate.addLangs(['en', 'fr', 'he', 'ru', 'ar', 'zh', 'de', 'es', 'ja', 'ko', 'it', 'hu']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use('en');
  }

  ngOnInit() {

    this.http.get('./assets/config.json').subscribe(res => {
        window.sessionStorage.setItem('config', JSON.stringify(res));
        window.localStorage.setItem('config', JSON.stringify(res));
        // window.localStorage.setItem("config",res);
        console.log('Configuration has been loaded' + new Date());
      }
      , error => console.log('Error Loading Configuration:' + error));
  }
}
