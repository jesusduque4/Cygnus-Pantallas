import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Subscription } from 'rxjs';
import { ApirestService } from 'src/app/services/apirest.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit/*, OnDestroy */ {

  // subcription !: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apirest: ApirestService
  ) { }


  ngOnInit(): void {
    // this.subcription = this.apirest.onChangeView$.subscribe((data) => {
    //   console.log(data);
    //   this.router.navigate([data]);
    // });
    this.getView();
  }

  // ngOnDestroy(): void {
  //   console.log('Unsubscribe');
  //   this.subcription.unsubscribe();
  // }

  getView(): void {
    this.apirest.getView().subscribe((res: any) => {
      this.router.navigate([res.view]);
    });
  }
}
