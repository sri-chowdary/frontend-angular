import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postCourse(data : any){
    return this.http.post<any>("http://Learningappgroup2-env.eba-6bwrpd93.us-east-2.elasticbeanstalk.com/create",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCourse(){
    return this.http.get<any>("http://Learningappgroup2-env.eba-6bwrpd93.us-east-2.elasticbeanstalk.com/course")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateCourse(data : any,id:number){
    return this.http.put<any>("http://Learningappgroup2-env.eba-6bwrpd93.us-east-2.elasticbeanstalk.com/update/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteCourse(id : number){
    console.log("yyyyyy",id);
    
    return this.http.delete<any>("http://Learningappgroup2-env.eba-6bwrpd93.us-east-2.elasticbeanstalk.com/delete/"+id)
    .pipe(map((res:any)=>{
      
      return res;
    }))
  }
}
