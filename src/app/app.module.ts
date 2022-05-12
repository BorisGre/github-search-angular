import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

//import { GithubSearchService } from './service/github-search-service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RepositoryComponent } from './repository/repository.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { RepoElementComponent } from './repo-element/repo-element.component';

@NgModule({
  declarations: [
    AppComponent,
    //RepositoryComponent,
    FormComponentComponent,
    RepoElementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [GithubSearchService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 