import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dataex';
  loading: Boolean = true;
  data=[];
  set =[];
  min : any = 0;
  max : any = 0;
  debit: Number;
  credit: Number;
  ring: string;
  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */

  
      const binarystr: string = e.target.result;
      const wb:any = XLSX.read(binarystr, { type: 'binary',cellDates: true });

      /* selected the first sheet */
      console.log(wb.SheetNames[0])
      const wsname: string = wb.SheetNames[0];
      // console.log()
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
     let data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
 // Data will be logged in array format containing objects
 const CreditPhrase = /\bDISBURSEMENT|CREDIT ARRANGEMENT|LOAN|FACILITY|CREDIT|PAY\b/g
 
 data.forEach((e:any)=> {
console.log(e)

console.log(e['Description'])

this.ReqularExpressionChecker(e)

 })
    
 
    };
  

 }
click(){
  this.data = [];
}
 ReqularExpressionChecker(e){

  const CreditPhrase = /\bDISBURSEMENT|\sCREDIT[\w\s]+ARRANGEMENT|\sLOAN|\sFACILITY\b/g
 const DebitPhrase = /\bREMITA|DIRECT[\w\s]+DEBIT|LOAN[\s]+REPAYMENT|LOAN[\w\s]+PYMT|LOAN[\w\s]+INSTALLMENT|\sPAYMENT\b/g
  const IncomePhrase = /\bSALARY|\sNETPAY|\sBONUS|\sREMUNERATION|salary\b/g

  let value = e['Description'].toString().toUpperCase();
 
  if(e[' Withdrawls '] == undefined){
     this.debit = 0;
  }else{
   this.debit = e[' Withdrawls '] 
  }
  if(e[' Deposits '] === undefined){
    this.credit = 0;
 }else{
  this.credit = e[' Deposits '] 
 }
  if((IncomePhrase.test(value)) && (this.credit > 0)){
    this.data.push({...e,Type:'INCOME'})
    let salary = /\bSALARY|\ssalary\b/g
    let bonus = /\bBONUS|\sbonus\b/g
    if(salary.test(value) && (!bonus.test(value))){
    
this.ring = e['Value Date'].toString().toUpperCase()
const words = this.ring.split(' ');
let saldate = parseInt(words[2])
console.log(words[2]);
this.set.push(saldate)
    }
    this.min = Math.min(...this.set)
    this.max = Math.max(...this.set)
  } 
 else if((DebitPhrase.test(value)) && (this.debit > 0)){
    this.data.push({...e,Type:'DEBIT'})

}

else
if((CreditPhrase.test(value)) && (this.credit > 0)){
  this.data.push({...e,Type:'CREDIT'})

} else {
  this.data.push({...e})
}




 }
}
