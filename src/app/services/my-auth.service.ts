// import {Injectable} from '@angular/core';
// @Injectable({
//     providedIn: 'root'
// })
// export class MyAuthService{

//     constructor(private adalService: AdalService)
//     {}
// }




// import { Injectable } from '@angular/core';
// import { MsalService, MsalModule, MsalConfig } from '@azure/msal-angular'
// import { UserAgentApplication, User } from 'msal';
// @Injectable({
//   providedIn: 'root'
// })
// export class MyAuthService {
//   private myApp: UserAgentApplication;
//   public loggedInUser: User;

//   constructor() {
//     this.myApp = new UserAgentApplication('clientId', 'authority', () => {
//       //callback for login redirect
//     })
//   }

//   public login() {
//     return this.myApp.loginPopup(['user.read'])
//       .then(idToken => {
//         this.loggedInUser = this.myApp.getUser();
//         return this.myApp.getUser();
//       });
//   }

//   public logout() {
//     this.myApp.logout();
//   }

//   public getToken() {
//     return this.myApp.acquireTokenSilent(['user.read'])
//       .then(accessToken => {
//         return accessToken;
//       }, error => {
//         return this.myApp.acquireTokenPopup(['user.read'])
//           .then(accessToken => {
//             return accessToken;
//           }, err => {
//             console.error(err);
//           });
//       });
//   }
// }
 

