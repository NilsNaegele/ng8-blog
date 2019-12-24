import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng8-blog-nasa';

  goToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
