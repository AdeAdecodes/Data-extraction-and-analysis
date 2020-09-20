import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



type AOA = any[][];
var value=[];

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent     {
  set: any=null;
  min: number=0;
  max: number=0;
  money:any;

list =new Set();
  constructor(private cdr: ChangeDetectorRef) {}
  name =0;
  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any // excel row header
salaryPaid: any ;
salanum:any;
countArray=[];

 public subject =new BehaviorSubject<any>("a"); 

ngAfterContentChecked() {

  // this.salanum;
this.cdr.detectChanges();
  
   }


  /* <input type="file" (change)="onFileChange($event)" multiple="false" /> */
  /* ... (within the component class definition) ... */
  onFileChange(evt: any) {
    /* wire up file reader */
    this.salanum=0;
  this.min=0;
  this.max=0;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, range: 10}));
      console.log(this.data[1]);

      this.headData = this.data[0];
      this.salaryPaid=[];
      this.set=[];
     // this.salanum=0;
     this.ReqularExpressionChecker(1);
      this.data = this.data.slice(1); // remove first header record

      const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
      this.readDataSheet(ws2, 10);
    };

    
    reader.readAsBinaryString(target.files[0]);

    console.log( Array.from(this.list));
  }

  private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
    /* save data */
    let datas = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, range: startRow}));
    console.log(datas[1]);
    let headDatas = datas[0];
    datas = datas.slice(1); // remove first header record

    for (let i = 0; i < this.data.length; i++) {
      this.data[i][this.headData.length] = datas.filter(x => x[12] == this.data[i][0])
    }
  
  
   // this.testlogic(this.data,this.headData)

  //  for (const element of this.data) {

  //  this.summaryCalculation(element);

   
  // }
  // console.log( Array.from(this.list));
  
  }

  export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
  }
  
  testlogic(data,head){
let result;
    data.forEach(element => {
      for (let i = 1;i<=head.length;i++) {
      // result.push({head[i]:data[i]} );
      }
      
    });

  }
  

  public myFunction(value): string {

    
    var numbers = value.map(this.numbersOnly);
    let salary = /\bSALARY|\ssalary\b/g
    let bonus = /\bBONUS|\sbonus\b/g
    if(salary.test(value.toString().toUpperCase())){
    
      var regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
      const matches = value.filter((animal) => regex.test(animal)).map((values)=>{
        var parts =values.split('/');
      
       return parts[0]; 
      });

      console.log(...matches);
     this.set.push(...matches);
      this.salaryPaid.push(1);

      this.salanum= this.salaryPaid.length;

    }


    this.min = Math.min(...this.set)==Number.POSITIVE_INFINITY?0: Math.min(...this.set);
    this.max = Math.max(...this.set)==Number.NEGATIVE_INFINITY?0:Math.max(...this.set);
    
    //  this.min=  Math.min(...this.set);
    //  this.max = Math.max(...this.set);

  //console.log(Math.min(...this.set));
    
    return numbers.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

  }

  numbersOnly(e) {
    var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
let value = '';
let result = 2;
  
    if (isNaN(parseInt(e))) {
  const CreditPhrase = /\bDISBURSEMENT|\sCREDIT[\w\s]+ARRANGEMENT|\sLOAN|\sFACILITY|\sCR|\sCREDIT|\sPRINCIPAL\b/g
 const DebitPhrase = /\bREMITA|DIRECT[\w\s]+DEBIT|LOAN[\s]+REPAYMENT|LOAN[\w\s]+PYMT|\sLOAN[\w\s]+REPYMT|LOAN[\w\s]+INSTALLMENT|\sPRINCIPAL|\sADVANCE|\sINTEREST|\sLIQ|\sLIQUIDATION\b/g
  const IncomePhrase = /\bSALARY|\sNETPAY|\sSAL|\sREMUNERATION|\sSAL|NET[\s]+INC|NET[\s]+INCOME|\sINCOME\b/g;
  const OtherIncome = /\bALLWS|\sQtr|\sQUARTERLY|\sALLOWANCE|\sLEAVE|\sUPFRONT|\sBONUS\b/g
  const RETURNCHEQUE  = /\bDAR|\sRTD[\w\s]+CHQ\b/g
  if((IncomePhrase.test(e.toString().toUpperCase()))){
 
  
    value= 'INCOME';
  }
  else if((DebitPhrase.test(e.toString().toUpperCase()))){



  
    return 'Loan Repayment ';

}
else
if((CreditPhrase.test(e.toString().toUpperCase()))){
  value= 'Loan Disbursement';

}

else
if((OtherIncome.test(e.toString().toUpperCase()))){
  value= 'Other Income';

}
else
if((RETURNCHEQUE.test(e.toString().toUpperCase()))){
  value= 'Returned Cheque';

}

else {
  value ='' ;
}
    }

    return value;
}

ReqularExpressionChecker(e){
 console.log('re');

//   const CreditPhrase = /\bDISBURSEMENT|\sCREDIT[\w\s]+ARRANGEMENT|\sLOAN|\sFACILITY\b/g
//  const DebitPhrase = /\bREMITA|DIRECT[\w\s]+DEBIT|LOAN[\s]+REPAYMENT|LOAN[\w\s]+PYMT|LOAN[\w\s]+INSTALLMENT|\sPAYMENT\b/g
//   const IncomePhrase = /\bSALARY|\sNETPAY|\sBONUS|\sREMUNERATION|salary\b/g
//   if((IncomePhrase.test(e))){
//     return 'INCOME';
//   }
//   else if((DebitPhrase.test(e))){
//     return 'DEBIT';

// }
// else
// if((CreditPhrase.test(e))){
//   return 'CREDIT';

// } else {
//   return '';
// }


}

mmIsDate(str) {

  if (str == undefined) { return false; }

  var parms = str.split(/[\.\-\/]/);

  var yyyy = parseInt(parms[2], 10);

  if (yyyy < 1900) { return false; }

  var mm = parseInt(parms[1], 10);
  if (mm < 1 || mm > 12) { return false; }

  var dd = parseInt(parms[0], 10);
  if (dd < 1 || dd > 31) { return false; }

  var dateCheck = new Date(yyyy, mm - 1, dd);
  return (dateCheck.getDate() === dd && (dateCheck.getMonth() === mm - 1) && dateCheck.getFullYear() === yyyy);

};
summaryCalculation(row):any{
 console.log(row);
 var  rows = String(row).toUpperCase().split(",");
if(rows.includes('VALUE DATE')|| rows.includes('CREDIT') && this.set.length==0){

this.set = rows;


}

else if(this.set.length>0){

  var newarray = [],
    thing={};
  for(var y = 0; y < 6; y++){
   
    
    for(var i = 0; i < 6; i++){
        thing[this.set[i]] = rows[i];
    
        
    }

    this.list.add(thing)
}

}
else {

}

// if(this.set){
 
//   var newarray = [],
//   thing;

// for(var y = 0; y < row.length; y++){
//   thing = {};
//   for(var i = 0; i < this.set.length; i++){
//       thing[this.set[i]] = row[y][i];
//   }
// this.list.push(thing)
// }

// console.log(this.list);
// }
// else{
//   console.log('balane');
// }
}


}
