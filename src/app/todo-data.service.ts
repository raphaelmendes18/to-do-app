import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './types/task';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private todos: any[] = [];
  private todoDataSource = new BehaviorSubject<Task[]>([]);
  todoData$ = this.todoDataSource.asObservable();

  updateTodoData = (index: number, data: Task) => {
    console.log('Dados:', data);
    console.log('Index de edição:', index);
    this.todos[index]= (data);
    this.todoDataSource.next([...this.todos]);
  }

  addTodoData = (data: Task) => {
  this.todos.push(data);
  this.todoDataSource.next([...this.todos]);
  }

  deleteTodoItem = (index: number) => {
    this.todos.splice(index, 1);
    this.todoDataSource.next([...this.todos]);
  }

  toggleComplete = (index: number) => {
    this.todos[index].completed = !this.todos[index].completed;
    this.todoDataSource.next([...this.todos]);
  }

}
