import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Array<Post> = new Array<Post>();
  postSubscription: Subscription;
  deletePostSubscription: Subscription;
  searchPost = '';

  constructor(private postService: PostsService, private alert: AlertService) { }

  ngOnInit() {
    this.postSubscription = this.postService.getAll().subscribe(p => {
      this.posts = p;
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.deletePostSubscription) {
      this.deletePostSubscription.unsubscribe();
    }
  }

  remove(id: string) {
    this.deletePostSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Post was removed!');
    });
  }
}
