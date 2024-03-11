
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarModel } from "../Model/carModel";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}



@Injectable({
    providedIn: 'root'
  })

export class CarService {

    url = 'https://localhost:44348/'

    constructor(private http: HttpClient) { }


    saveCar(car: CarModel): Observable<CarModel> {

        return this.http.post<CarModel>(this.url + 'api/CarRegister', car, httpOptions)
           
    }

    getCars() : Observable<CarModel[]>{
        return this.http.get<CarModel[]>(this.url + 'api/CarRegister',httpOptions)
    }

    deleteCar(id:string) {
        return this.http.delete<CarModel>(this.url + 'api/CarRegister/' + id)
    }




}