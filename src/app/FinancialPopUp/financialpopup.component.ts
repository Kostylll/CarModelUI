import { Component, OnInit } from "@angular/core";
import { CarService } from "../Service/car.service";
import { CarModel } from "../Model/carModel";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { FinancialModel } from "../Model/financialModel";
import { FinancialService } from "../Service/financial.service";

@Component({
    selector: 'my-financial',
    templateUrl: './financialpopup.component.html',
    styleUrls:['./financialpopup.component.scss']
})


export class FinancialComponent implements OnInit{

    user = {} as FinancialModel
    cars : CarModel[] = []
   
    creditForm : FormGroup
    resultado: string | null = null;


  constructor(private finService : FinancialService,private carService : CarService){}

    ngOnInit() {
       this.getCars();
        this.creditForm = new FormGroup({
            nome: new FormControl('', [Validators.required]),
            sobrenome: new FormControl('', [Validators.required]),
            idade: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]), 
            documento: new FormControl('', [Validators.required]), 

    })
    }

      getCars() {
        this.carService.getCars().subscribe(result => {
          this.cars = result;
        });
      }


      analisarCredito() {
        const randomScore = Math.floor(Math.random() * 999) + 1;
        if (randomScore >= 1 && randomScore <= 299) {
          this.resultado = 'Reprovado';
        } else if (randomScore >= 300 && randomScore <= 599) {
          this.resultado = '70% de entrada, 30% do comprometimento da renda';
        } else if (randomScore >= 600 && randomScore <= 799) {
          this.resultado = '50% de entrada, 25% do comprometimento da renda';
        } else if (randomScore >= 800 && randomScore <= 950) {
          this.resultado = '30% de entrada, 20% do comprometimento da renda';
        } else {
          this.resultado = '100% de financiamento, taxa zero';
        }

        const formData = this.creditForm.value;

        let nome = this.creditForm.get('nome').value
        let sobrenome = this.creditForm.get('sobrenome').value
        let email = this.creditForm.get('email').value
        let documento = this.creditForm.get('documento').value
        let idade = this.creditForm.get('idade').value
      

        this.user.name = nome
        this.user.secondname = sobrenome
        this.user.email = email
        this.user.document = documento
        this.user.age = idade
     
        console.log(formData)
        this.finService.getCredit(this.user).subscribe(result =>{
          console.log(result)
        })

}
}