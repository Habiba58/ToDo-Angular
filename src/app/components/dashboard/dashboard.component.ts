import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { taskInterface } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild("addInput") addInputElement: ElementRef = {} as ElementRef;
  @ViewChild("editInput") editInputElement: ElementRef = {} as ElementRef;
  addTaskValue: string = '';
  editTaskValue: string = '';
  selectedTaskToBeUpdated: number = 0;
  tasksList: taskInterface[] = [];
  newTask: taskInterface = {} as taskInterface;
  updatedTask: taskInterface = {} as taskInterface
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getAllTasks().subscribe((tasks: taskInterface[]) => {
      this.tasksList = tasks;
    })
  };
  addTask() {
    this.newTask.taskDesc = this.addTaskValue;
    const observer = {
      next: (task: taskInterface) => {
        this.ngOnInit();
        window.alert('Task Added Successfully!')
      }
    }
    this.crudService.addNewTask(this.newTask).subscribe(observer);
    this.addInputElement.nativeElement.value = '';
  }
  deleteTask(taskID: number) {
    this.crudService.deleteTask(taskID).subscribe((task: taskInterface) => {
      window.alert('Task Deleted Sucessfully!');
      this.ngOnInit();
    })
  }
  closeAlert() {
    document.getElementById("alert")?.classList.add('d-none');
    document.getElementById("overLayer")?.classList.add('d-none');
  }
  editTaskModal(id: number, taskID: number) {
    this.selectedTaskToBeUpdated = taskID;
    document.getElementById("alert")?.classList.replace('d-none', 'd-block');
    document.getElementById("overLayer")?.classList.replace('d-none', 'd-block');
    this.editInputElement.nativeElement.value = this.tasksList[id].taskDesc;
  }
  updateTask() {
    this.updatedTask.taskDesc = this.editTaskValue;
    console.log(this.selectedTaskToBeUpdated)
    this.crudService.editTask(this.selectedTaskToBeUpdated, this.updatedTask).subscribe((task: taskInterface) => {
      window.alert('Task Updated Sucessfully!');
      this.ngOnInit();
      this.closeAlert();
    });
    this.editInputElement.nativeElement.value = '';

  }

}
