import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.hero = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     return this.heroService.getHero(Number(params.get('id')))
    //   })
    // );

    /** Alternate for route.paramMap observable */
    let params = this.route.snapshot.paramMap;
    let heroIdFromRoute = Number(params.get('id'));
    this.getHero(heroIdFromRoute);
  }

  getHero(id: number) {
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  updateHero(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
