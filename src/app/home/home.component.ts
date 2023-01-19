import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  expenses: any;
  incomes: any;
  income:any = 0;
  expense:any = 0;
  balance:any;
  maxIncome:any;
  minIncome:any;
  maxExpense:any;
  minExpense:any;
  max:any;
  min:any;
  expvalue = new Expense();
  constructor(private _service:CommonService) { }

  ngOnInit(): void {
    this.getAllIncome();
    this.getAllExpense();
    this.getIncome();
    this.getExpense();
    this.getMaxIncome();
    this.getMaxExpense();
    this.getMinIncome();
    this.getMinExpense();
    this.alertBalance();
  }  

  getIncome()
  {
    this._service.getIncomeFromRemote().subscribe(
      data=>
      {
        this.income = data
        console.log("Own Income "+this.income);        
      }
    )
  }
  getExpense()
  {
    this._service.getExpenseFromRemote().subscribe(
      data=>
      {
        this.expense = data
        console.log("Own Expense "+this.expense);
      }
    )
  }
  getAllIncome()
  {
    this._service.getAllIncomeFromRemote().subscribe(
      data=>
      {
        this.incomes = data
        console.log(this.incomes);
      }
    )
  }
  getAllExpense()
  {
    this._service.getAllExpenseFromRemote().subscribe(
      data=>
      {
        this.expenses = data
        console.log(this.expenses);
        
      }
    )
  }
  addIncome(expvalue:any)
  {
    if(expvalue.name == null && expvalue.amount == null)
    {
      alert("Provide value for Title and amount");
    }
    else if(expvalue.name == null)
    {
      alert("Enter Title");
    }
    else if(expvalue.amount == null)
    {
      alert("Enter Amount");
    }
    else if(expvalue.name != null && expvalue.amount != null)
    {
    expvalue.type = "income"
    console.log(expvalue);
    this._service.addMoneyRemote(expvalue).subscribe(
      data =>{
        console.log(data); 
        this.refreshPage();       
      }
    )  
    }
  }
  addExpense(expvalue:any)
  {
    expvalue.type = "expense"
    console.log(expvalue);
    this._service.addMoneyRemote(expvalue).subscribe(
      data =>{
        console.log(data);   
        this.refreshPage();     
      }
    )  
  }
  deleteItem(id:any)
  {    
    console.log(id);
    this._service.deleteItemRemote(id).subscribe();
    this.refreshPage();
  }
  refreshPage() 
  {
  window.location.reload();
  }
  getMaxIncome()
  {
    this.max = "income";
    this._service.getMaxAmount(this.max).subscribe(
      data=>
      {
        this.maxIncome = data;
        console.log("maxIncome : "+this.maxIncome);
        
      }
    )
  }
  getMaxExpense()
  {
    this.max = "expense";
    this._service.getMaxAmount(this.max).subscribe(
      data=>
      {
        this.maxExpense = data;
        console.log("maxExpense : "+this.maxExpense);
        
      }
    )
  }
  getMinIncome()
  {
    this.min = "income";
    this._service.getMinAmount(this.min).subscribe(
      data=>
      {
        this.minIncome = data;
        console.log("minIncome : "+this.minIncome);
        
      }
    )
  }
  getMinExpense()
  {
    this.min = "expense";
    this._service.getMinAmount(this.min).subscribe(
      data=>
      {
        this.minExpense = data;
        console.log("minExpense : "+this.minExpense);
        
      }
    )
  }
  alertBalance()
  {
    console.log("alertBalance");
    this.balance = this.income - this.expense;
    console.log(this.balance);
    console.log("Income"+this.income);
    console.log("Expense"+this.expense);
      
    
    if(this.expense > this.income)
    {
      alert("Your Expense is more than your Income");
    }
  }
}
