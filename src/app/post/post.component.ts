import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  articleId: number;

  constructor( private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    console.log(this.articleId);
  }

  goBack(): void {
    this.location.back();
  }

}
