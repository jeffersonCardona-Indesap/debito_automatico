import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  imports: [],
  standalone: true,
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const paramValue = params['token'];
      if (paramValue===undefined || paramValue===null) {
        console.log('paramValue: ', paramValue);
        this.router.navigate(['/failed']);
      } else {
        this.router.navigate(['/general-content']);
      }
        // Do something with
    });
  }

}
