import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/shared/auth.service';
import { Post } from '../../post/shared/post.model';
import { ToDo } from '../shared/to-do.model';
import { ToDoService } from '../shared/to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit {
  toDoList: ToDo[];
  postList: Post[];
  selectedToDo: ToDo;
  addingToDo = false;
  error: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    public toDoService: ToDoService,
    private http: Http) {
      authService.$auth.subscribe(
          response => {
            this.getToDoList();
          }
      );
    }

  ngOnInit(): void {
    this.getToDoList();
  }

  getToDoList(): void {
    this.error = null;
    this.toDoService.get().subscribe(
      (toDoList: ToDo[]) => this.toDoList = toDoList,
      error => {
        this.handleError(this, error);
        this.toDoList = [];
      });
  }

  addToDo(): void {
    this.error = null;
    this.addingToDo = true;
    this.selectedToDo = null;
  }

  close(savedToDo: ToDo): void {
    this.addingToDo = false;
    if (savedToDo) { this.getToDoList(); }
  }

  deleteToDo(toDo: ToDo, event: any): void {
    this.error = null;
    event.stopPropagation();
    this.toDoService.remove(toDo).subscribe(
      () => {
        this.toDoList = this.toDoList.filter(h => h.id !== toDo.id);
        this.selectedToDo = null;
      },
      error => { this.handleError(this, error); });
  }

  gotoDetail(toDo: ToDo): void {
    this.router.navigate(['/to-do-details', toDo.id]);
  }

  private handleError(self: any, error: any) {
    if (error.status === 403) {
      error.message += ' You must sign in to see the To Do list. In the meantime, how about some posts?';
    }
    this.error = error;
  }
}
