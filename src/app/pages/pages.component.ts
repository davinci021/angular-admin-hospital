import { Component, OnInit } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SettingsService } from './../services/settings.service';


declare function customInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  
  constructor( private settingsService : SettingsService) { }
  
  ngOnInit(): void {
    customInitFunction();
  }

}