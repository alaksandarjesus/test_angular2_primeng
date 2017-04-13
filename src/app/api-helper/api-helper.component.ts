import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { AuthService } from '../core/auth/shared/auth.service';
import { PostService } from '../post/shared/post.service';
import { ToDoService } from '../to-do/shared/to-do.service';

@Component({
  selector: 'app-api-helper',
  templateUrl: './api-helper.component.html'
})
export class ApiHelperComponent implements OnInit {
  currentServiceInfo: any;
  serviceInfoList = [];
  addItem: any = {};
  results = [];
  properties = [];
  error: any;
  message: any;
  constructor(
    private authService: AuthService,
    private http: Http,
    private toDoService: ToDoService,
    private postService: PostService) {
  }

  ngOnInit() {
    let serviceObjects = [this.toDoService, this.postService];
    for (let i = 0; i < serviceObjects.length; i++) {
      this.serviceInfoList.push({
        id: null,
        service: serviceObjects[i],
        title: serviceObjects[i].constructor.name.replace('Service', '')
      });
    }
    this.currentServiceInfo = this.serviceInfoList[0];
    this.get(this.serviceInfoList[0]);
    this.authService.$auth.subscribe(
      response => {
        this.get(this.currentServiceInfo);
      }
    );
  }

  get(serviceInfo: any) {
    this.currentServiceInfo = serviceInfo;
    this.error = null;
    this.message = null;
    if (serviceInfo.id === null) {
      this.serviceInfoList.forEach(item => item.active = false);
      serviceInfo.active = true;
      serviceInfo.service['get']().subscribe(
        (response) => {
          this.results = response;
          this.properties = Object.keys(this.results[0]);
        },
        error => this.error = error);
    } else {
      this.serviceInfoList.forEach(item => item.active = false);
      serviceInfo.active = true;
      serviceInfo.service['getById'](serviceInfo.id).subscribe(
        (response) => {
          this.results = [response];
          this.properties = Object.keys(response);
        },
        error => this.error = error);
    }
  }

  add(item: any) {
    this.error = null;
    this.message = null;
    this.currentServiceInfo.service['add'](item).subscribe(
      (response) => {
        this.message = 'Item added successfully!';
        this.results.push(response);
        this.addItem = {};
      },
      error => this.error = error);
  }

  update(item: any) {
    this.error = null;
    this.message = null;
    this.currentServiceInfo.service['update'](item).subscribe(
      (response) => {
        this.message = 'Item updated successfully!';
      },
      error => this.error = error);
  }

  remove(item: any) {
    this.error = null;
    this.message = null;
    this.currentServiceInfo.service['remove'](item).subscribe(
      (response) => {
        this.message = 'Item deleted successfully!';
        this.results = this.results.filter(h => h !== item);
      },
      error => this.error = error);
  }
}
