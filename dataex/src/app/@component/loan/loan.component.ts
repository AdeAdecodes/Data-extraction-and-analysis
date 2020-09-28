import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {


  TotalCredit=0;
  TotalDebit=0;
  TotalIncome=0;
  TotalReturnCheque=0;
  TotalOtherIncome=0;
  salaryPay=[];
  salaryCount=0;
  maxDayPaid=0;
  minDayPaid=0;
  salaryTimesPaid=0;


  elements: any = [
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];

  ngOnInit() {

  }



  onSubmit() {
    // do something here
  }

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
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      // Data will be logged in array format containing objects
 this.elements=data;
 for (let index = 0; index <  this.elements.length; index++) {
 this.getInformation( this.elements[index]);

 if(index<=this.elements.length){
      console.log("end");
      this.maxDayPaid= Math.max(...this.salaryPay);
      this.minDayPaid= Math.min(...this.salaryPay);
      this.salaryCount=this.salaryPay.length;
    }
 }

      //  this.elements.forEach((e,i)=>{
      //   this. getInformation(e);
      //   console.log(i);
      //   console.log(data.length);
      //   if(i+6==this.elements.length){
      //     console.log("end");
      //     this.maxDayPaid= Math.max(...this.salaryPay);
      //     this.minDayPaid= Math.min(...this.salaryPay);
      //     this.salaryCount=this.salaryPay.length;
      //   }
      // })

    };



 }

 getInformation(e){

  const CreditPhrase = /\bDISBURSEMENT|\sCREDIT[\w\s]+ARRANGEMENT|\sLOAN|\sFACILITY|\sCR|\sCREDIT|\sPRINCIPAL\b/g;
  const DebitPhrase = /\bREMITA|DIRECT[\w\s]+DEBIT|LOAN[\s]+REPAYMENT|LOAN[\w\s]+PYMT|\sLOAN[\w\s]+REPYMT|LOAN[\w\s]+INSTALLMENT|\sPRINCIPAL|\sADVANCE|\sINTEREST|\sLIQ|\sLIQUIDATION\b/g;
   const IncomePhrase = /\bSALARY|\sNETPAY|\sSAL|\sREMUNERATION|\sSAL|NET[\s]+INC|NET[\s]+INCOME|\sINCOME\b/g;
   const OtherIncome = /\bALLWS|\sQtr|\sQUARTERLY|\sALLOWANCE|\sLEAVE|\sUPFRONT|\sBONUS\b/g;
   const RETURNCHEQUE  = /\bDAR|\sRTD[\w\s]+CHQ\b/g;
   if((IncomePhrase.test(e.Details.toString().toUpperCase()))){
    this.TotalIncome=this.TotalIncome+e.Credit;
  this.salaryPay.push(this.mmIsDate(e.EntryDate));
   }
  else if((DebitPhrase.test(e.Details.toString().toUpperCase()))){
  this.TotalDebit=this.TotalDebit+e.Debit;





}
else
if((CreditPhrase.test(e.Details.toString().toUpperCase()))){

  this.TotalCredit=this.TotalDebit+e.Credit;
}

else
if((OtherIncome.test(e.Details.toString().toUpperCase()))){

  this.TotalOtherIncome=this.TotalDebit+e.Credit;
}
else
if((RETURNCHEQUE.test(e.Details.toString().toUpperCase()))){

  this.TotalReturnCheque=this.TotalDebit+e.Credit;
}

else {

}
 }

 mmIsDate(serial) {


  if (serial == undefined) { return false; }
  var utc_days  = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
   var date_info = new Date(utc_value * 1000);

   var fractional_day = serial - Math.floor(serial) + 0.0000001;

   var total_seconds = Math.floor(86400 * fractional_day);

   var seconds = total_seconds % 60;

   total_seconds -= seconds;

   var hours = Math.floor(total_seconds / (60 * 60));
   var minutes = Math.floor(total_seconds / 60) % 60;

   return date_info.getDate();
};

}
