import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css',
})
export class ListPosts implements OnInit {
  posts: Post[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7029/api/post')
      .subscribe({
        next: (data: Post[]) => {
          this.posts = [...data];
          this.cdr.detectChanges();
          console.log(this.posts);
        }
      });
  }
}