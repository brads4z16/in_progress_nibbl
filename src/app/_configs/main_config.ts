import { Injectable } from "@angular/core";

@Injectable()
export class Config {

  public uri = "http://localhost:5000";

  /*
  Colors:
  Background: #4c495d;
  Card-Background: #d1d7e0;
  Card-text: #2d283e;
  Toolbar-background: #7B1FA2;
  page-background: #673AB7 this is the page background
  Toolbar-text: #d1d7e0;
  Toolbar-color: #7b1fa2;
  maybe default secondary: #424242
  */

  public networkerror = "An error occurred while contacting the authentication server.";
  constructor() {}
}
