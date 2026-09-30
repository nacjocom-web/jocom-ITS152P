import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  initData(): void {
    this.http.get<Post>("https://localhost:7029/api/post/" + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.cdr.detectChanges();
        console.log(this.post);
      }
    });
  }
}