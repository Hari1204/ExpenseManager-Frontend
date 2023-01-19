import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) { }

  getAllIncomeFromRemote():Observable<any> {
   return this._http.get<any>("http://localhost:8084/getExpense/income");
  }
  getAllExpenseFromRemote()
  {
    return this._http.get<any>("http://localhost:8084/getExpense/expense");
  }
  getIncomeFromRemote() {
    return this._http.get<any>("http://localhost:8084/getAmountSum/income");
  }
  getExpenseFromRemote()
  {
    return this._http.get<any>("http://localhost:8084/getAmountSum/expense");
  }
  addMoneyRemote(expvalue:any)
  {
    return this._http.post("http://localhost:8084/addExpense",expvalue);
  }
  deleteItemRemote(id:any)
  {    
    return this._http.delete<any>("http://localhost:8084/deleteByid/"+id);  
  }
  getMaxAmount(max:any)
  {
    return this._http.get<any>("http://localhost:8084/Max/"+max);
  }
  getMinAmount(min:any)
  {
    return this._http.get<any>("http://localhost:8084/Min/"+min);
  }
}
