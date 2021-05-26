import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import sortBy from 'sort-by';
//import { jqxNavBarComponent } from 'jqwidgets-ng/jqxnavbar';
import { FormControl } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public instituicao$: Observable<any>;
  nomeinst: any;
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://609d21d304bffa001792e09f.mockapi.io/api/instituicoes';
  total: number;

  title = 'Lista de instituições - Alsofer'; 
  
  //@ViewChild('navBarReference') myNavBar: jqxNavBarComponent;
  

  /* Código utilizado para testar enquanto caiu o banco de dados.
  instituicao = [{
    id: 1,
    razaoSocial: "Universo",
    createdAt: "01/02/2021"
  },
  {
    id: 2,
    razaoSocial: "CPC",
    createdAt: "01/02/2022"
  },
  {
    id: 3,
    razaoSocial: "Expositivo",
    createdAt: "01/02/2023"
  }]; */

  constructor(private http: HttpClient){

  }

 

  ngOnInit() {
    this.instituicao$ = this.http.get("https://609d21d304bffa001792e09f.mockapi.io/api/instituicoes");
  }
  
  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== ''){}
    
    this.instituicao$ = this.http.get(this.SEARCH_URL + '?search=' + value)
    .pipe(
    tap((res: any) => this.total = res.total),
    map((res: any) => res)
    );
  }

  onRefresh(){
    this.instituicao$ = this.http.get("https://609d21d304bffa001792e09f.mockapi.io/api/instituicoes");
  }

  // Organizando lista
  key: string = 'nomeinst';
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
