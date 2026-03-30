import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})

export class ParseService {
  constructor() {
    const PARSE_APP_ID = "your-application-id";
    const PARSE_JS_KEY = "your-javascript-key";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
    (Parse as any).serverURL = 'https://parseapi.back4app.com/';
  }
}