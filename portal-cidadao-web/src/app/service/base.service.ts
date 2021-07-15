import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public apiBaseUrl = `${window.location.origin}/api`;

  constructor(public httpClient: HttpClient) { }
}
