import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class StorageService {
  setItemWithoutEncryption(key: string, item: string) {
    console.log(key);
    console.log(item);
    localStorage.setItem(key, item);
  }
  //JSON.stringify(
  getItemWithoutEncryption(key: string): string {
    const checkItem: string | null = localStorage.getItem(key);
    if (checkItem) {
      return checkItem;
    } else {
      return "";
    }
  }
}
