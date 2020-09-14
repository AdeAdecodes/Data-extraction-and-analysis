import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];
var value=0;

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent     {
  set: any;
  min: number=0;
  max: number=0;
  constructor(private cdr: ChangeDetectorRef) {}
  name =0;
  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any // excel row header
salaryPaid: any ;
salanum:any;

ngAfterContentChecked() {

  // this.salanum;
  this.cdr.detectChanges();
  
   }


  /* <input type="file" (change)="onFileChange($event)" multiple="false" /> */
  /* ... (within the component class definition) ... */
  onFileChange(evt: any) {
    /* wire up file reader */
    this.salanum=0;
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
    console.log(this.data[0]);
   // this.testlogic(this.data,this.headData)
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
    if(salary.test(value.toString().toUpperCase()) && (!bonus.test(value.toString()))){
      var regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
      const matches = value.filter((animal) => regex.test(animal)).map((values)=>{
        var parts =values.split('/');
      
       return parts[0]; 
      });
   
  
     this.set.push(...matches)
      this.salaryPaid.push(1);
   
      this.salanum= this.salaryPaid.length;

    }
    this.min = Math.min(...this.set)==Number.POSITIVE_INFINITY||Number.NEGATIVE_INFINITY?0: Math.min(...this.set);
    this.max = Math.max(...this.set)==Number.POSITIVE_INFINITY||Number.NEGATIVE_INFINITY?0:Math.max(...this.set);
    console.log(this.min );


    return numbers.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

  }

  numbersOnly(e) {
let value = '';
    if (isNaN(parseInt(e))) {
  const CreditPhrase = /\bDISBURSEMENT|\sCREDIT[\w\s]+ARRANGEMENT|\sLOAN|\sFACILITY|\sCR\b/g
 const DebitPhrase = /\bREMITA|DIRECT[\w\s]+DEBIT|LOAN[\s]+REPAYMENT|LOAN[\w\s]+PYMT|LOAN[\w\s]+INSTALLMENT|\sPAYMENT\b/g
  const IncomePhrase = /\bSALARY|\sNETPAY|\sBONUS|\sREMUNERATION|salary\b/g
  if((IncomePhrase.test(e.toString().toUpperCase()))){
   
  
    value= 'INCOME';
  }
  else if((DebitPhrase.test(e.toString().toUpperCase()))){
    return 'DEBIT';

}
else
if((CreditPhrase.test(e.toString().toUpperCase()))){
  value= 'CREDIT';

} else {
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

}
