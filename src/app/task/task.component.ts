import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDataService } from '../todo-data.service';
import { Task } from '../types/task';
import { Dialog } from '@angular/cdk/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';

@Component({
  selector: 'task',
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  title: string = 'task';
  toDoItems: Task[] = [];

  constructor(private todoDataService: TodoDataService, private dialog: Dialog) {}

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

  editTodo = (index: number) => {
    let task = this.todoDataService.getTodoItem(index);
    const dialogRef = this.dialog.open(EditTaskFormComponent, {
      data: task,
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.todoDataService.editTodoItem(index, result);
      }
    });
  }

}
