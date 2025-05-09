import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDataService } from '../todo-data.service';
import { Task } from '../types/task';

@Component({
  selector: 'task',
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  title: string = 'task';
  toDoItems: Task[] = [];

  constructor(private todoDataService: TodoDataService) {}

  ngOnInit() {
    this.todoDataService.todoData$.subscribe((data) => {
      this.toDoItems = data;
    });
  }

  toggleComplete = (index: number) => {
    this.todoDataService.toggleComplete(index);
  }

  deleteTodo = (index: number) => {
    this.todoDataService.deleteTodoItem(index);
  }

}
