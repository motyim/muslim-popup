/// <reference types="chrome"/>
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  save(value): void {
    chrome.storage.sync.set({ayahNumber: (++value)});
  }

  get(key): any {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['ayahNumber'], (result) => {
        resolve(result.ayahNumber);
      });
    });
  }
}
