//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// 3rd party imports
//import { MsalModule, MsalGuard, MsalService, MsalConfig } from '@azure/msal-angular';
import { NgxLoadingModule } from 'ngx-loading';

// application imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { AllPlayersComponent } from './all-players/all-players.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PlayerComponent } from './player/player.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { TestCardComponent } from './game-play/test-card/test-card.component';
import { ShowNotificationComponent } from './show-notification/show-notification.component';
// import { LoginComponentComponent } from './login-component/login-component.component';
// import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyProfileComponent,
    MyFriendsComponent,
    AllPlayersComponent,
    NavMenuComponent,
    PlayerComponent,
    CreateGameComponent,
    JoinGameComponent,
    GamePlayComponent,
    LoginOrRegisterComponent,
    TestCardComponent,
    ShowNotificationComponent//,
    // LoginComponentComponent,
    // LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'top-center',
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// ,
//     MsalModule.forRoot({
//       clientID: "387f26ef-3444-410c-a770-731e6a26cb3b",
//       authority: "https://login.microsoftonline.com/myunotest.onmicrosoft.com/",
//       redirectUri: window.location.origin + '/',
//       validateAuthority : true,
//       cacheLocation : "localStorage",
//       storeAuthStateInCookie: false, // dynamically set to true when IE11
//       postLogoutRedirectUri: "http://localhost:4200/",
//       navigateToLoginRequestUrl : true,
//       popUp: true,
//     })