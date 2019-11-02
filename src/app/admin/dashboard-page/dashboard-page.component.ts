import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Array<Post> = new Array<Post>();
  postSubscription: Subscription;
  searchPost = '';

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postSubscription = this.postService.getAll().subscribe(p => {
      this.posts = p;
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  remove(id: string) {

  }
}
