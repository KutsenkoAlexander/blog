import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../../shared/interfaces';

@Pipe({
  name: 'searchPosts'
})
export class SearchPostPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => {
      console.log(search)
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
  }

}
