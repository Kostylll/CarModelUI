import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CarModel } from "../Model/carModel";
import { CarService } from "../Service/car.service";
import Swal from "sweetalert2";

@Component({
    selector: 'my-car',
    templateUrl: './carpopup.component.html',
    styleUrls : ['./carpopup.component.scss'],
})

export class CarPopUpComponent implements OnInit{

 register: FormGroup;
 car = {} as CarModel;
 cars : CarModel[];
 
constructor(private carService : CarService){}


  ngOnInit(){
    this.register = new FormGroup({
      modelo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]), 
      descricao: new FormControl('', [Validators.required]) 
    });
  }


   saveCar() {
    const formData = this.register.value;

    let modelo = this.register.get("modelo").value;
    let tipo = this.register.get("tipo").value;
    let cor = this.register.get("cor").value;
    let preco = this.register.get("preco").value;
    let descricao = this.register.get("descricao").value;

    this.car.model = modelo;
    this.car.type = tipo;
    this.car.color = cor;
    this.car.price = preco;
    this.car.description = descricao;

    console.log('Dados Salvos: ', formData);

    this.carService.saveCar(this.car).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Carro Registrado!',
        text: 'O carro foi registrado com sucesso.',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      });
    });
  }
  }





