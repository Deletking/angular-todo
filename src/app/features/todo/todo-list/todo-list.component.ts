import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Task } from '../../../core/models/task.model';

type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  tasks = input<Task[]>();
  deleteTask = output<number>();
  taskCompletion = output<number>();
  deleteTaskCompleted = output<void>();
  reorderTasks = output<Task[]>();

  currentFilter = signal<FilterType>('all');

  taskList = computed(() => {
    const tasks = this.tasks() || [];
    switch (this.currentFilter()) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  taskCounter = computed(
    () => this.tasks()?.filter((task) => !task.completed).length ?? 0
  );

  taskCounterCompleted = computed(
    () => this.tasks()?.filter((task) => task.completed) ?? []
  );

  filterCompleted() {
    this.currentFilter.set('completed');
  }

  filterActive() {
    this.currentFilter.set('active');
  }

  filterAll() {
    this.currentFilter.set('all');
  }

  onTaskCompletion(taskId: number) {
    this.taskCompletion.emit(taskId);
  }

  onDeleteTask(taskId: number) {
    this.deleteTask.emit(taskId);
  }

  onDeleteTaskCompleted() {
    this.deleteTaskCompleted.emit();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const updatedTasks = [...(this.tasks() || [])];
    moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex);
    this.reorderTasks.emit(updatedTasks);
  }
}
