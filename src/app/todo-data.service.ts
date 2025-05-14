import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './types/task';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private todos: Task[] = [];
  private todoDataSource = new BehaviorSubject<Task[]>([]);
  todoData$ = this.todoDataSource.asObservable();

  constructor() {
    this.todos = this.loadFromLocalStorage();
    this.todoDataSource.next([...this.todos]);
  }

  updateTodoData(data: Task) {
    this.todos.push(data);
    this.saveToLocalStorage(this.todos);
    this.todoDataSource.next([...this.todos]);
  }

  deleteTodoItem(index: number) {
    this.todos.splice(index, 1);
    this.todoDataSource.next([...this.todos]);
    this.saveToLocalStorage(this.todos);
  }

  toggleComplete = (index: number) => {
    this.todos[index].completed = !this.todos[index].completed;
    this.todoDataSource.next([...this.todos]);
    this.saveToLocalStorage(this.todos);
  };

  getTodoItem = (index: number) => {
    return this.todos[index];
  };

  editTodoItem = (index: number, task: Task) => {
    this.todos[index] = task;
    this.todoDataSource.next([...this.todos]);
    this.saveToLocalStorage(this.todos);
  };

  private loadFromLocalStorage(): Task[] {
    let todos: Task[] = [];
    if (localStorage.getItem('todos')) {
      todos = JSON.parse(localStorage.getItem('todos')!) as Task[];
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
    }
    return todos;
  }

  private saveToLocalStorage(todos: Task[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
