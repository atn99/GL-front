import { Component, OnInit } from '@angular/core';
import {LineBill} from "../../model/lineBill";
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/dynamical-functions/SharedService";

@Component({
  selector: 'app-home-expenses',
  templateUrl: './home-expenses.component.html',
  styleUrls: ['./home-expenses.component.css']
})
export class HomeExpensesComponent implements OnInit {
  lineBills!: LineBill[];
  filteredlineBills!: LineBill[];

  billId!: number;


  set filteredExpense(lineBills : LineBill[]){
    this.filteredlineBills = lineBills;
    /*
      this.lineBills = this.lineBills?.filter(
        lineBill => lineBill?.idExpenseBill == this?.billId
      );*/
  }

  constructor(private apiService:ApiService, private sharedService : SharedService) {
    sharedService.clickOnBillEvent.subscribe(
      (billId: number) => {
        this.billId = billId;
    });
    console.log(this.billId);
    this.apiService.getLineBillListByExpenseId(this.billId).then(res => {
      this.filteredlineBills = res!;}
      );
  }

  ngOnInit(): void {
    this.apiService.getLineBillList()
      .subscribe({
        next: (res) => {
          this.lineBills = res;
          this.filteredlineBills = res;
        },
        error: (e) => console.error(e)
      });
  }

}
