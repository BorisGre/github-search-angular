import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, from, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { GithubService} from './github-service';
import config from './shared/config';
import { GithubRepos } from './shared/github-repos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'github-search';
  repos: any
  searchRequest: string
  showRepos = false
  firstPage = false
  lastPage = false
  currentPage: number = 1
  nextPage: number = 1
  perPage: number
  totalRepos: number
  next$: Observable<any>
  @ViewChild('nextPage') buttonName: ElementRef;

  constructor(private gitHubService: GithubService){ 
     this.next$ = of(this.nextPage).pipe(
              tap(next => console.log(`next page ${next}`)),
              switchMap(next => this.gitHubService.fetch(this.searchRequest, next))
     )//.subscribe(d => console.log(`data for next page`, d)) 

     this.form.valueChanges.pipe(
          debounceTime (1200),
          distinctUntilChanged(),
          tap(_ => console.log(`valueChanges`)),
          tap(({request}:any) => this.searchRequest = request),
            switchMap(search => this.gitHubService.fetch(search.request, this.nextPage))        
        ).subscribe(
          (d: any) => {
            console.log(`REPOS`, d)
            this.repos = d
            this.totalRepos = d['total_count']///1d['']
            this.showRepos = true
            this.currentPage = this.nextPage
            
            this.lastPage = this.totalRepos - (config.per_pare*this.currentPage) <= 0 ? true : false

            console.log(`VIEW CHILD`, this.buttonName?.nativeElement.value);
            //his.buttonName?.nativeElement
          }
        );
   }
    onPrevious(){
      console.log(`previous`)
      this.nextPage = (this.currentPage-1) === 0 ? 1 : this.currentPage-1;
    
      this.gitHubService.fetch(this.searchRequest, this.nextPage).subscribe((d: any) => {
        console.log(`new REPOS`, d)
        this.repos = d
        this.currentPage = this.nextPage
        if(this.nextPage === 1) this.firstPage = true
        this.lastPage = (this.totalRepos - (config.per_pare*this.currentPage) <= 0) ? true : false
      })
    }

    onNext(){
      console.log(`next`)
      this.nextPage = this.currentPage+1;
      console.log(`next page`, this.nextPage)

      this.gitHubService.fetch(this.searchRequest, this.nextPage).subscribe((d: any) => {
        console.log(`new REPOS`, d)
        this.repos = d
        this.currentPage = this.nextPage
      })
    }

    ngOnInit() {}

    ngAfterViewInit () {
      console.log(`VIEW CHILD init`, this.buttonName?.nativeElement.value);
    }

    ngOnChanges(changes: any){
      console.log(`changes`, changes)
    }


    form = new FormGroup({
      request: new FormControl('', Validators.minLength(3)),
    });
  
    /*get request(): any {
      return this.form.get('request');
    }*/
  
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
