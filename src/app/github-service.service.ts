import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubRepos } from './shared/github-repos';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private http: HttpClient) { }


  fetch({request}: any) {
    console.log(`request`, request)
    //const url = `http://127.0.0.1:8000/search?q=${request}` //"https://jsonplaceholder.typicode.com/posts"
    //const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request}`
    const url = `https://api.github.com/search/repositories?q=${request}&sort=best_matched&order=desc`

    return this.http.get(url)
  }

  get({request}: any) {
    console.log(`get service`, request)
    //const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request}`
    const url = `https://api.github.com/search/repositories?q=${request}&sort=best_matched&order=desc`
    return this.http.get(url)
  }
}
