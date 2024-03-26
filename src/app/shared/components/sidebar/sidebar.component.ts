import { Component, signal } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  routes = signal([
    // { path: '', name: 'Home Page' },
    // { path: 'about', name: 'About Page' },
    // { path: 'contact', name: 'Contact Page' },
    // { path: 'countries', name: 'Countries Page' },
    { path: 'countries/by-capital', name: 'By Capital' },
    { path: 'countries/by-country', name: 'By Country' },
    { path: 'countries/by-region', name: 'By Region' },
  ]);
  constructor() {}
}
