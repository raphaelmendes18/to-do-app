import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Task } from '../types/task';

@Component({
  selector: 'app-edit-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css'
})
export class EditTaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef<EditTaskFormComponent>,
    @Inject(DIALOG_DATA) public data: Task
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(this.data?.name || '', Validators.required),
      dueDate: new FormControl(this.data?.dueDate || '', Validators.required),
      details: new FormControl(this.data?.details || ''),
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
