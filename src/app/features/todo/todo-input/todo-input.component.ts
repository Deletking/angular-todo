import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  taskInput = signal<string>('');

  taskAdded = output<string>();

  addTask() {
    const task = this.taskInput();
    if (task.trim()) {
      this.taskAdded.emit(task);
      this.taskInput.set('');
    }
  }
}
