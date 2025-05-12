import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  public taskForm!: FormGroup<any>;

  constructor(private todoDataService: TodoDataService){}
  
  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      details: new FormControl(''),
    });
  }

  onSubmit = () => {
    if (this.taskForm.valid) {
      this.todoDataService.updateTodoData(this.taskForm.value);
      this.taskForm.reset();
    }
  }

}
