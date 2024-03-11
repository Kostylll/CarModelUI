import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FinancialModel } from "../Model/financialModel";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}




@Injectable({
    providedIn:'root'
})

export class FinancialService{

    
    url = 'https://localhost:44348/'

    constructor(private http: HttpClient) { }


    getCredit(user : FinancialModel) : Observable<FinancialModel>{
      return  this.http.post<FinancialModel>(this.url + 'api/Financial',user,httpOptions)
    }

}