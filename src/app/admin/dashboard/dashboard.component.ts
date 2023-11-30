import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'app/service/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  details:any;
  logo:any
  value:any
  postedJobs:any
  jobId:any
  cards:any
  todayJob:any
  companyId:any
  appliedCandidate:any
  visitorLength:any


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private formService: FormService,
    private auth:ApiService,
    // private dialogService: DialogService,


  ) {

  }
  ngOnInit(): void {
    // this.dataservice.getparentdata('get-all-data-count').subscribe((res:any)=>{
    //   this.cards=res.data
    //   console.log( this.cards,"cardssssssssss")
    // })
// this.auth.GetByID
this.details=this.auth.getdetails()
console.log(this.details);

this.auth.getbyid("companies",this.details._id).subscribe((xyz:any)=>{
  console.log(xyz);
console.log(xyz.visitors);
this.visitorLength = xyz.visitors.length
this.visitorLength.length
console.log(this.visitorLength);
if(this.visitorLength===null){
  this.visitorLength=0
}
})
this.companyId = this.details.unique_id
console.log(this.companyId);

const filterValue: any = [
  {
    clause: "$and",
    conditions: [
      { column: "companyId", operator: "$eq", value: this.companyId},
    ]
  }
];
this.auth.getDataByFilter('jobs',filterValue).subscribe((abc:any)=>{
  console.log(abc.length);
this.postedJobs = abc.length
console.log(this.postedJobs);
if(this.postedJobs===null){
  this.postedJobs=0
}

      })
      this.companyId = this.details.unique_id
console.log(this.companyId);
       const filterValue1: any = [
        {
          clause: "$and",
          conditions: [
            { column: "companyId", operator: "$eq", value: this.companyId},
          ]
        }
      ];
      // console.log(filterValue1);

      this.auth.getDataByFilter('applied_jobs',filterValue1).subscribe((icf:any)=>{
        console.log(icf.length);
      this.appliedCandidate = icf.length
      console.log(this.appliedCandidate);
      if(this.appliedCandidate===null){
        this.appliedCandidate=0
      }

            })

            const startTime = moment().startOf('day').format();
            const endTime = moment().endOf('day').subtract(1, 'minute').format()
            console.log(startTime);
            console.log(endTime);

const filterValue2: any = [
        {
          clause: "$and",
          conditions: [
            { column: "companyId", operator: "$eq", value: this.companyId },
            { column: "createdOn", operator: "$gte", value:startTime ,type:"date"},
            { column: "createdOn", operator: "$lte", value:endTime ,type:"date"},
          ]
        }
      ];
      console.log(filterValue2);

      this.auth.getDataByFilter('applied_jobs',filterValue2).subscribe((res:any)=>{
        console.log(res);
      this.todayJob = res.length
      console.log(this.todayJob);
      if(this.todayJob===null){
        this.todayJob=0
      }

            })

setTimeout(()=>{
  this.cards = [
    {
      count: this.visitorLength,
      text: 'Total visitor',
      icon: 'home',
      iconColor: 'blue',
      altText: 'Icon 1',
      height: '100px',
      width: '150px'
    },
    {
      count: this.postedJobs,
      text: 'Job Post',
      icon: 'work',
      iconColor: 'green',
      altText: 'Icon 2',
      height: '120px',
      width: '180px'
    },
    {
      count: this.appliedCandidate,
      text: 'Job Applied',
      icon: 'assignment',
      iconColor: 'red',
      altText: 'Icon 3',
      height: '110px',
      width: '160px'
    },
    {
      count: this.todayJob,
      text: 'Applicant today',
      icon: 'list',
      iconColor: 'orange',
      altText: 'Icon 4',
      height: '130px',
      width: '170px'
    },
  ];

},1000);

// console.log(this.cards);




  }



  getdata(){
    this.route.params.subscribe((params:any) => {
      console.log("HIIIIIII")
      this.auth.getbyid("user",params.id).subscribe((res:any)=>{
       let data= res.data
       console.log(data)
       this.logo= sessionStorage.setItem("company_logo",data.profileimage)
      })
  })
  }

page_route(url:any){
  this.router.navigate([`${url}`]);
}


}
