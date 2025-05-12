import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoDataService } from '../todo-data.service';
import { Task } from '../types/task';

@Component({
  selector: 'task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  toDoItems: Task[] = [];
  taskForm: FormGroup;
  editingIndex: number | null = null;

  constructor(private todoDataService: TodoDataService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

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
    this.editingIndex = index;
    const task = this.toDoItems[index];
    this.taskForm.setValue({
      name: task.name,
      details: task.details
    });
  }

  cancelEdit = () => {
    this.editingIndex = null;
    this.taskForm.reset();
  }

  onSubmit = () => {
    if (this.taskForm.valid && this.editingIndex !== null) {
      
      this.todoDataService.updateTodoData(this.editingIndex, {
        name: this.taskForm.value.name,
        details: this.taskForm.value.details,
        completed: false 
      });

      this.taskForm.reset();
      this.editingIndex = null;
    }
  }
}