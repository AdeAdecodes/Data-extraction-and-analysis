import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dataex';
  data=[];

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
  
      const wsname: string = wb.SheetNames[2];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
     let data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
 // Data will be logged in array format containing objects
 const CreditPhrase = /\bDISBURSEMENT|CREDIT ARRANGEMENT|LOAN|FACILITY|CREDIT|PAY\b/g
 console.log(data);
 data.forEach((e:any)=>{

  if(e.Debit == 0 ){

    this.ReqularExpressionChecker(e)

  }
 else if (e.Credit == 0 ){

  this.ReqularExpressionChecker(e)

  }

  else{
    this.ReqularExpressionChecker(e)
  }



 })
    
    
    };
 }

 ReqularExpressionChecker(e){

  const CreditPhrase = /\bDISBURSEMENT|CREDIT ARRANGEMENT|LOAN|FACILITY|CREDIT|PAY\b/g
  const DebitPhrase = /\bREMITA|DIRECT DEBIT|LOAN REPAYMENT|LOAN PYMT |LOAN INSTALLMENT|PAYMENT\b/g
  const IncomePhrase = /\SALARY|NETPAY|BONUS|REMUNERATION\b/g

  let value = e['Transaction details'].toString().toUpperCase();

if(CreditPhrase.test(value)){
  this.data.push({...e,Type:'CREDIT'})

}

else if(DebitPhrase.test(value)){
  this.data.push({...e,Type:'DEBIT'})

}

else if(IncomePhrase.test(value)){
  this.data.push({...e,Type:'INCOME'})

}


 }
}
