import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  private token:string
  private isAuthenticated:boolean
  constructor(private authenticationService:AuthenticationService,
    private routerService:RouterService) {
      this.token=this.authenticationService.getBearerToken()
      this.isAuthenticated=true
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<any>((resolve,reject)=>{
        this.authenticationService.isUserAuthenticated(this.token).then((res)=>{
          console.log(res)
          if(res){
            resolve(true)
          }else{
            reject(false)
            this.routerService.routeToLogin()
          }
        })
      })
     
    
  }

  // canActivate(): Promise<boolean> {
  //   return this.authenticationService.authenticateUser(this.authenticationService.getBearerToken())
  //     .then((response) => {
  //       console.log(response);
  //       if (response.isAuthenticated) {
  //         return true;
  //       }
  //       else {
         
  //         this.routerService.routeToLogin();
  //         return false;

  //       }
  //     })


  // }
}
