import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Post } from '../../post/shared/post.model';
import { PostService } from '../../post/shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  postList: Post[];
  error: any;

  constructor(
    private router: Router,
    public postService: PostService,
    private toDoService: PostService,
    private http: Http) { }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    this.postService.get().subscribe(
      (postList: Post[]) => this.postList = postList,
      error => {
        this.postList = [];
        this.handleError(error);
      });
  }

  private handleError(error: any) {
    this.error = error;
  }
}
