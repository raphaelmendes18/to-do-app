import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './types/task';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  private todos: Task[] = [];
  private todoDataSource = new BehaviorSubject<Task[]>([]);
  todoData$ = this.todoDataSource.asObservable();

  updateTodoData(data: Task) {
    this.todos.push(data);
    this.todoDataSource.next([...this.todos]);
  }

  deleteTodoItem(index: number){
    this.todos.splice(index, 1);
    this.todoDataSource.next([...this.todos]);
  }

  toggleComplete = (index: number) => {
    this.todos[index].completed = !this.todos[index].completed;
    this.todoDataSource.next([...this.todos]);
  }

  getTodoItem = (index: number) => {
    return this.todos[index];
  }
  
  editTodoItem = (index: number, task: Task) => {
    this.todos[index] = task;
    this.todoDataSource.next([...this.todos]);
  }

}
