import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    details: new FormControl(''),
  });

  constructor(private todoDataService: TodoDataService){

  }

  onSubmit = () => {
    if (this.taskForm.valid) {
      this.todoDataService.updateTodoData(this.taskForm.value);
      this.taskForm.reset();
    }
  }

}
