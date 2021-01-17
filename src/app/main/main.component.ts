import {Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router, NavigationEnd, Event} from '@angular/router';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import PerfectScrollbar from 'perfect-scrollbar';
import {filter} from 'rxjs/operators';

import {MenuItems} from '../core/menu/menu-items/menu-items';
import {PageTitleService} from '../core/page-title/page-title.service';
import {AuthService} from '../core/service/auth/auth.service';
import {CoreService} from '../core/service/core/core-service.service';

declare var require;

const screenfull = require('screenfull');

@Component({
  selector: 'sbm-layout',
  templateUrl: './main-material.html',
  styleUrls: ['./main-material.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit, OnDestroy {

  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  customizerIn = false;
  chatWindowOpen = false;
  chatSidebar = false;
  sidebarClosed = false;
  chatpanelOpen = false;
  sidenavOpen = true;
  isMobile = false;
  isFullscreen = false;
  _opened = true;
  _showBackdrop = false;
  _closeOnClickOutside = false;
  showSettings = false;

  _mode = 'push';
  sidenavMode = 'side';
  themeSkinColor: any = 'gray';
  headerSkinColor: any = 'header-primary';
  root: any = 'ltr';
  layout: any = 'ltr';
  header: string;
  url: string;
  public innerWidth: any;
  input: any;
  miniSidebar = false;
  private _router: Subscription;
  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  currentLang = 'ar';
  @ViewChild('sidenav', {static: false}) sidenav;

  constructor(
    private coreService: CoreService,
    private authService: AuthService,
    public menuItems: MenuItems,
    private pageTitleService: PageTitleService,
    public translate: TranslateService,
    private router: Router,
    private media: MediaObserver) {

    const browserLang: string = translate.getBrowserLang();
    translate.use('en');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.pageTitleService.title.subscribe((val: string) => {
      this.header = val;
    });

    this._router = this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });

    if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container');

      /** Perfect scrollbar for sidebar menu **/
      if (window.matchMedia(`(min-width: 1280px)`).matches) {
        const ps = new PerfectScrollbar(elemSidebar, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });
        ps.update();
      }

      /** Perfect scrollbar for chat window **/
      const elemChatbar = <HTMLElement>document.querySelector('.chat-inner ');
      if (window.matchMedia(`(min-width: 1280px)`).matches) {
        const pse = new PerfectScrollbar(elemChatbar);
      }
    }

    if (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md')) {
      this._mode = 'over';
      this._closeOnClickOutside = true;
      this._showBackdrop = true;
      this._opened = false;
      this.sidebarClosed = false;
    }

    this._mediaSubscription = this.media.media$.subscribe((change: MediaChange) => {
      const isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm') || (change.mqAlias == 'md');

      this.isMobile = isMobile;
      this._mode = (isMobile) ? 'over' : 'push';
      this._closeOnClickOutside = (isMobile) ? true : false;
      this._showBackdrop = (isMobile) ? true : false;
      this._opened = !isMobile;
      this.sidebarClosed = false;
    });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });

    // Add class on focus of search box in header
    // document.getElementById('search-field').addEventListener("focusin",function(){
    // 	document.getElementById('search-field').parentElement.classList.add("search-active");
    // })
    //
    // document.getElementById('search-field').addEventListener("focusout",function(){
    // 	document.getElementById('search-field').parentElement.classList.remove("search-active");
    // })
  }

  ngOnDestroy() {
    this._router.unsubscribe();
    this._mediaSubscription.unsubscribe();
  }

  /**
   * toggleFullscreen method is used to show a template in fullscreen.
   */
  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  /**
   * _toggleOpened method is used to toggle a menu list.
   */
  public _toggleOpened() {
    this._opened = !this._opened;
    this.sidebarClosed = !this.sidebarClosed;
  }

  /**
   * customizerFunction is used to open and close the customizer.
   */
  customizerFunction() {
    this.customizerIn = !this.customizerIn;
  }

  /**
   * chatWindowFunction is used to open and close the chat window.
   */
  chatWindowFunction() {
    this.chatWindowOpen = !this.chatWindowOpen;
  }

  /**
   * chatSidebarFunction is used to open and close the chat sidebar list.
   */
  chatSidebarFunction() {
    this.chatSidebar = !this.chatSidebar;
  }

  /**
   * changeThemeColor function filter the color for sidebar section.
   */
  changeThemeColor(color) {
    this.themeSkinColor = color;
  }

  /**
   * changeHeaderColor function filter the color for header section.
   */
  changeHeaderColor(color) {
    this.headerSkinColor = color;
  }

  /**
   * addMenuItem is used to add a new menu into menu list.
   */
  addMenuItem(): void {
    this.menuItems.add({
      state: 'pages',
      name: 'CHANKYA MENU',
      type: 'sub',
      icon: 'icon-plus icons',
      children: [
        {state: 'blank', name: 'SUB MENU1'}
      ]
    });
  }

  /**
   * As router outlet will emit an activate event any time a new component is being instantiated.
   */
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  /**
   * changeRTL method is used to change the layout of template.
   */
  changeRTL(isChecked) {
    if (isChecked) {
      this.layout = 'rtl'
      this.coreService.rtlShowStatus = true;
    } else {
      this.layout = 'ltr'
      this.coreService.rtlShowStatus = false;
    }
  }

  /**
   * toggleSidebar method is used to switch between Icon sidebar and Sidebar.
   */
  toggleSidebar(isChecked) {
    console.log(isChecked)
    this.miniSidebar = !isChecked;
    if (isChecked) {
      document.getElementById('showSidebar').classList.remove('icon-sidebar');
      document.getElementsByClassName('app')[0].classList.remove('icon-sidebar-wrap');
      document.getElementById('boxed-layout').classList.remove('disabled-checkbox');
    } else {
      document.getElementById('showSidebar').className += ' icon-sidebar';
      document.getElementsByClassName('app')[0].className += ' icon-sidebar-wrap';
      document.getElementById('boxed-layout').className += ' disabled-checkbox';
    }
  }

  /**
   * logOut method is used to log out the  template.
   */
  logOut() {
    this.authService.logOut();
  }

  /**
   *closeOnClickOutside method is used when click on outside close/open the sidebar.
   */
  closeOnClickOutside() {
    if (this._opened) {
      this.sidebarClosed = false;
    } else {
      this.sidebarClosed = true;
    }
    return this._closeOnClickOutside;
  }

  /**
   * boxedLayout method is used to show the box layout.
   */
  boxedLayout(isChecked) {
    if (isChecked) {
      this.boxed = true;
      document.getElementById('icon-sidebar').className += ' disabled-checkbox';
    } else {
      this.boxed = false;
      document.getElementById('icon-sidebar').classList.remove('disabled-checkbox');
    }
  }
}
