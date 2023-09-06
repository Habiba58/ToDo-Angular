import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { taskInterface } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  httpOptions;
  APILink: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  getAllTasks(): Observable<taskInterface[]> {
    return this.httpClient.get<taskInterface[]>(`${this.APILink}/tasks`);
  }
  getTaskByID(taskId: number): Observable<taskInterface> {
    return this.httpClient.get<taskInterface>(`${this.APILink}/tasks/${taskId}`)
  }
  addNewTask(newTask: taskInterface): Observable<taskInterface> {
    return this.httpClient.post<taskInterface>(`${this.APILink}/tasks`, JSON.stringify(newTask), this.httpOptions);
  }
  editTask(taskId: number, editedTask: taskInterface): Observable<taskInterface> {
    return this.httpClient.put<taskInterface>(`${this.APILink}/tasks/${taskId}`, JSON.stringify(editedTask), this.httpOptions);
  }
  deleteTask(taskId: number): Observable<taskInterface> {
    return this.httpClient.delete<taskInterface>(`${this.APILink}/tasks/${taskId}`);
  }
}
