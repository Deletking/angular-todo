import { Component, inject, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { ThemeService } from '../../core/services';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoInputComponent, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  themeService = inject(ThemeService);
  tasks = signal<Task[]>([]);

  toggleTheme() {
    const newTheme =
      this.themeService.getCurrentTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }

  onTaskAdded(taskText: string) {
    if (taskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      this.tasks.update((tasks) => [...tasks, newTask]);
    }
  }

  onTaskCompletion(taskId: number) {
    this.tasks.update((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  onDeleteTask(taskId: number) {
    this.tasks.update((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  onDeleteTaskCompleted() {
    this.tasks.update((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );
  }

  onReorderTasks(updatedTasks: Task[]) {
    this.tasks.set(updatedTasks);
  }
}
