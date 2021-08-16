// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { MsalService } from '@azure/msal-angular';
// import { MyAuthService } from './services/my-auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyCanNavigateGuard implements CanActivate {
//   constructor(
//     private aadSvc: MsalService,
//     private router: Router,
//     private authSvc: MyAuthService
//   ){}

//   canActivate() {
//     var result : boolean = false;
//     if(this.authSvc.loggedInUser){
//       return true;
//     }
//     else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return result;
//   }
// }
