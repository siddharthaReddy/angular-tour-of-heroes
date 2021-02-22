import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {

  // crisis$: Observable<Crisis>;
  crisis$: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // let params = this.route.snapshot.paramMap;
    // let crisisIdFromRoute = Number(params.get('id'));
    // this.getCrisis(crisisIdFromRoute);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log("Crisis detail switchMap");
        return this.crisisService.getCrisis(Number(params.get('id')))
       })
    ).subscribe((crisis:any) => {
      console.log("Crisis detail subscribe");
      this.crisis$ = crisis;
      this.editName = this.crisis$.name;
    });
  }

  save() {
    this.crisis$.name = this.editName;
    this.gotoCrises();
  }

  cancel() {
    this.editName = this.crisis$.name;
    this.gotoCrises();
  }

  gotoCrises() {
    this.router.navigate(['../', { id: this.crisis$.id, foo: 'foo' }], { relativeTo: this.route });
  }

}
