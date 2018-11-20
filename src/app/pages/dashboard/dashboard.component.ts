import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:any = { }
  constructor(private service:ServiceService) { }

  ngOnInit() {

    this.totalCount();
    
  }


  totalCount(){
    this.service.showSpinner();
    this.service.get('totalCount', 1).subscribe(res=>{
      this.service.hideSpinner();
      if(res['responseCode'] == 200){
        this.data = res['result'];
      }
      else if(res['responseCode'] == 404 || res['responseCode'] == 401){
        this.service.error(res['responseMessage'])
        this.service.navigatePage('login');
      }
      else{
        this.service.error(res['responseMessage'])
      }

    }, err=>{
      this.service.hideSpinner();
      this.service.serverError();
    })
  }

}
