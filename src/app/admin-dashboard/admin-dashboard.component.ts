import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AdminModel } from './admin-dashboard.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  formValue !: FormGroup;
  adminModelobj : AdminModel = new AdminModel();
  courseData !: any;
  constructor(private formbuilber:FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue= this.formbuilber.group({
     courseid : [''],
     coursename : [''],
     courseprice : ['']
    })
    this.getAllCourse();
  }
postCourseDetails()
{
  this.adminModelobj.courseId=this.formValue.value.courseid;
  this.adminModelobj.courseName=this.formValue.value.coursename;
  // this.adminModelobj.courseprice=this.formValue.value.courseprice;
  
  this.api.postCourse(this.adminModelobj)
  .subscribe(res=>{
    console.log(res);
    alert("Course Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllCourse();
  },
  err=>{
    alert("Something Went Wrong")
  })
  
}
getAllCourse(){
  this.api.getCourse()
  .subscribe(res=>{
    this.courseData=res;
    console.log(res);
    
  })
}
deleteallCourse(row : AdminModel)
{
  this.api.deleteCourse(row.courseId)
  .subscribe(res=>{
    alert("Course Deleted")
    this.getAllCourse()
  })
}

onEdit(row: any ){
  // this.showAdd = false;
  // this.showUpdate = true;
  
  this.adminModelobj.Id =row.courseId;
  console.log(  this.adminModelobj);
  this.formValue.controls['courseid'].setValue(row.courseid);
  this.formValue.controls['coursename'].setValue(row.coursename);
  //this.formValue.controls['courseprice'].setValue(row.courseprice);
}

updateCourseDetails(){
  this.adminModelobj.courseId=this.formValue.value.courseid;
  this.adminModelobj.courseName=this.formValue.value.coursename;
 // this.adminModelobj.courseprice=this.formValue
 this.api.updateCourse(this.adminModelobj,this.adminModelobj.Id)
  .subscribe(res=>{
    alert("Update successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllCourse();
  })

}
}
