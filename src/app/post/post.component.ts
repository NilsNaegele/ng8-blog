import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  articleId: number;

  constructor( private route: ActivatedRoute, private router: Router,
               private location: Location) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    console.log(this.articleId);
    if (this.articleId !== 1) {
      this.router.navigate(['page-not-found']);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
