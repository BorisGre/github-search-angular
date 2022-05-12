import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, pipe, switchMap, tap } from 'rxjs';
import { GithubServiceService } from './github-service.service';
import { GithubRepos } from './shared/github-repos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'github-search';
  repos: any
  showRepos = false

  constructor(private gitHubService: GithubServiceService){ 

     this.form.valueChanges.pipe(
          debounceTime (1200),
          distinctUntilChanged(),
          tap(_ => console.log(`valueChanges`)),
            switchMap(search => this.gitHubService.fetch(search))        
        ).subscribe(
          (d: any) => {
            console.log(`REPOS`, d)
            this.repos = d
            this.showRepos = true
          }
        );
   }
    ngOnInit() {} 

    form = new FormGroup({
      request: new FormControl('', Validators.minLength(3)),
    });
  
    get request(): any {
      return this.form.get('request');
    }
  
    onSubmit() {
      console.log(`form`, this.form.value)
      //return
       this.gitHubService.get(this.form.value)
      .subscribe(
        (d: any) => { 
          console.log(`onsubmit`, this.form.value, d)
          this.repos = d
          this.showRepos = true
          console.log(d), console.log(`DATA by submit`, this.repos)},
      )
    }
}
