import { ActivatedRoute, Params } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ToDo } from '../shared/to-do.model';
import { ToDoService } from '../shared//to-do.service';

@Component({
  selector: 'app-to-do-details',
  templateUrl: './to-do-details.component.html'
})
export class ToDoDetailsComponent implements OnInit {
  @Input() toDo: ToDo;
  @Output() close = new EventEmitter();
  error: any;
  isLoaded: boolean;

  constructor(
    public router: Router,
    public toDoService: ToDoService,
    public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.toDoService.getById(id).subscribe(
          (toDo: ToDo) => this.toDo = toDo,
          error => this.handleError(error),
          () => this.isLoaded = true);
      } else {
        this.toDo = new ToDo();
      }
    });
  }

  save(): void {
    let saveFunction = this.toDo.id ? this.toDoService.update(this.toDo) : this.toDoService.add(this.toDo);
    saveFunction.subscribe(
      (toDo: ToDo) => {
        this.toDo = toDo;
        this.goBack(toDo);
      },
      error => this.handleError(error));
  }

  goBack(savedToDo: ToDo = null): void {
    this.close.emit(savedToDo);
    this.router.navigate(['/to-do-list']);
  }

  private handleError(error: any) {
    this.error = error;
  }
}
