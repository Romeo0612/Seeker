import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase  from 'firebase/compat/app';
import { ApiService } from './search.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userProfile:any;
 token:any[]=[];
  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private api:ApiService
 
  ) { }
   // Sign in with Google
   GoogleAuth() {
    
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    
  }

  // Auth logic to run auth providers
  async AuthLogin(provider:any){
    try {
      const result :any= await this.afAuth.signInWithPopup(provider);
      console.log(result.user);
      console.log(result.user.multiFactor.user, "result.user");
      console.log(result.user.multiFactor.user.accessToken)
      this.SetUserData(result.user.multiFactor.user);
    } catch (error) {
     console.log(error);
    }
  }
  async SetUserData(user:any) {
    // this.userAuthData = user;
    this.api.GetByID('user','email',user.email)
        .subscribe((doc:any)=> {  
            if (doc.length==0) { 
              let userData=Object.assign(
                {userId:user.uid},
                {user_name:user.displayName},{email:user.email},
                {mobile_number:user.phoneNumber},
                {user_photo:user.photoURL||'/assets/image/default-user.jpg'},
                {role:"user"},{isProfileCompleted:false},{isActive:true})
                console.log(userData);
                // localStorage.setItem('auth', JSON.parse(userData)) 
                this.api.save('user',userData).subscribe((result:any)=>{
                  console.log('user posted successfully')
                }

              
              )
             
             
            
              // this.api.storedToken(this.token);
                this.callRedirect()
                
              } else {
                debugger
                
                this.token.push({token:user.accessToken})
                this.token.push(doc[0]);
          
                this.api.storedToken(this.token);
                this.userProfile = doc[0];
                this.callRedirect()
            }})
                 
            
    
  }
  callRedirect() {
    if (!this.userProfile.isProfileCompleted)
      this.router.navigate(['/dashboard/event-list']);
    else
      this.router.navigate(['/home']);
}

}

