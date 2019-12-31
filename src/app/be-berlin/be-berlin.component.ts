import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-be-berlin',
  templateUrl: './be-berlin.component.html',
  styleUrls: ['./be-berlin.component.scss']
})
export class BeBerlinComponent implements OnInit {
  articleId = 6;
  posts = [
    {
  id: 100,
  imageHeaderUrl: 'url(assets/img/post5-bg.jpg)',
  heading: 'Typescript, Basis- Teil 5',
  subHeading: ' Generics, Enums, Fortgeschrittene Typen',
  metaPublishedDate: 'am 25 Dezember, 2019',
  sectionHeading: ' Generics, Enums, Fortgeschrittene Typen',
  code: `
  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post5.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
}

  ];

  constructor(private route: ActivatedRoute, private router: Router,
              public sanitization: DomSanitizer) { }

  ngOnInit() {
    this.articleId = 6;
  }

}
