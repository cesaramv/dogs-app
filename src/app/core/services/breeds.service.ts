import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  private urlBreeds = `${environment.HOST}/breeds/list/all`;
  private urlBreed = `${environment.HOST}/breed`;

  constructor(private readonly http: HttpClient) { }

  getBreeds(params: any) {
    return this.http.get(`${this.urlBreeds}`, { params }).pipe(
      map((items: any) => {
        if (items.status === 'success') {
          //return items.message
          const resp = [];
          for (const [key, value] of Object.entries(items.message)) {
            resp.push({ breed: key, subbreed: value });
          }
          return resp;
        }else{
          return null;
        }
      })

    );
  }

  getSubBreeds(params: any) {
    return this.http.get(`${this.urlBreed}/${params.breed}/list`);
  }

  getImagesBreed(params: any) {
    return this.http.get(`${this.urlBreed}/${params.breed}/images`);
  }

  getImagesSubBreed(params: any) {
    return this.http.get(`${this.urlBreed}/${params.breed}/${params.subbreed}/images`);
  }
}
