import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class HttpService {


  // baseUri = "http://localhost:3000";
  baseUri = "https://sv4-esn-services.herokuapp.com";

  jwt = localStorage.getItem('jwt');

  constructor(private http: Http) { }

  get = (path: string, params?: Object): Observable<any> => {
    let requestUri = `${this.baseUri}${path}`;
    let requestOptions = new RequestOptions();
    if (params) {
      let urlSearchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        urlSearchParams.set(key, params[key]);
      });
      requestOptions.search = urlSearchParams;
    }
    if (this.jwt) {
      let headers: Headers = new Headers({ 'Authorization': `JWT ${this.jwt}` });
      requestOptions.headers = headers;
    }

    return this.http.get(requestUri, requestOptions)
      .map(res => res.json())
      .catch(this.handleError)
  };

  post = (path: string, params?: Object): Observable<any> => {
    let requestUri = encodeURI(`${this.baseUri}${path}`);
    let requestOptions = new RequestOptions();
    requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
    if (this.jwt) {
      requestOptions.headers.append('Authorization', `JWT ${this.jwt}`);
    }

    return this.http.post(requestUri, JSON.stringify(params), requestOptions)
      .map(res => res.json())
      .catch(this.handleError);
  };

  put = (path: string, params?: Object): Observable<any> => {
    let requestUri = encodeURI(`${this.baseUri}${path}`);
    let requestOptions = new RequestOptions();
    requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
    if (this.jwt) {
      requestOptions.headers.append('Authorization', `JWT ${this.jwt}`);
    }

    return this.http.put(requestUri, JSON.stringify(params), requestOptions)
      .map(res => res.json())
      .catch(this.handleError);
  };

  delete = (path: string, params?: Object): Observable<any> => {
    let requestUri = `${this.baseUri}${path}`;
    let requestOptions = new RequestOptions();
    if (params) {
      let urlSearchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        urlSearchParams.set(key, params[key]);
      });
      requestOptions.search = urlSearchParams;
    }
    if (this.jwt) {
      let headers: Headers = new Headers({ 'Authorization': `JWT ${this.jwt}` });
      requestOptions.headers = headers;
    }

    return this.http.delete(requestUri, requestOptions)
      .map(res => res.json())
      .catch(this.handleError)
  };

  private handleError = (error: Response) => {
    return Observable.throw(error.json());
  }

}
