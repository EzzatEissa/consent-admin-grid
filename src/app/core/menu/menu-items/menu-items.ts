import {Injectable} from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  label?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  label?: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'consent/home',
    name: 'Home',
    type: 'link',
    icon: 'fa fa-home',
  },
  {
    state: 'consent/user',
    name: 'Users',
    type: 'link',
    icon: 'icon-users',
  },
  {
    state: 'consent/app',
    name: 'Applications',
    type: 'link',
    icon: 'icon-smartphone',
  },
  {
    state: 'consent/permission',
    name: 'Permissions',
    type: 'link',
    icon: 'icon-unlock',
  }
  ,
  {
    state: 'ob-sandbox',
    name: 'Ob-sandbox',
    type: 'sub',
    icon: 'icon-credit-card2',
    // label: 'New',
    children: [
      {state: 'view-users', name: 'View User'},
      {state: 'add-accounts', name: 'Add Accounts'},
      {state: 'add-transactions', name: 'Add Transactions'},
      {state: 'add-balances', name: 'Add Balance'},
      {state: 'lookup-config', name: 'Lookup Config'}
    ]
  }

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
