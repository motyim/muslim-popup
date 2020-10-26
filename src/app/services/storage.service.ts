/// <reference types="chrome"/>
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  save(value): void {
    chrome.storage.local.set({ayahNumber: (++value)});
  }

  get(key): any {
    return new Promise((resolve) => {
      chrome.storage.local.get(['ayahNumber'], (result) => {
        resolve(result.ayahNumber);
      });
    });
  }
}
