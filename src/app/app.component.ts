import { Component, OnInit } from '@angular/core';
import { CarService } from './Service/car.service';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { CarModel } from './Model/carModel';
import { CarPopUpComponent } from './CarPopUp/carpopup.component';
import { FinancialComponent } from './FinancialPopUp/financialpopup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'car-model';
  cars: CarModel[] = [];

  constructor(private dialogRef: MatDialog, private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  adicionarCarro() {
    const dialogRef = this.dialogRef.open(CarPopUpComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCars(); // Atualiza a lista após adicionar um novo carro
      }
    });
  }

  deleteCar(car: CarModel) {
    Swal.fire({
      title: "Você quer mesmo deletar este Carro?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(car.id).subscribe(() => {
          this.getCars();
          Swal.fire({
            title: 'Carro Deletado!',
            text: 'Ok',
            icon: "success"
          });
        });
      }
    });
  }

  financiar() {
    const dialogRef = this.dialogRef.open(FinancialComponent,{
      width:'60%'
    })
  }

  getCars() {
    this.carService.getCars().subscribe((result) => {
      this.cars = result;
      console.log(this.cars);
    });
  }
}
