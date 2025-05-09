import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-app';
}
