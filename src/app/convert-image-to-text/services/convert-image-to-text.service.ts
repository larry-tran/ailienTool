import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvertImageToTextService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(body: any){
    let url = `${environment.api}/upload`;
    return this.httpClient.post(url, body);
  }
}
