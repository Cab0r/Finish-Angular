import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { ShowGameComponent } from './views/show-game/show-game.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { RepitePassDirective } from './directives/repite-pass.directive';
import { RankingComponent } from './views/ranking/ranking.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateRankingComponent } from './views/create-ranking/create-ranking.component';
import { AboutusComponent } from './views/aboutus/aboutus.component';
import { UpdateRankingComponent } from './views/update-ranking/update-ranking.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowGameComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    NavbarComponent,
    FooterComponent,
    RepitePassDirective,
    RankingComponent,
    CreateRankingComponent,
    AboutusComponent,
    UpdateRankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
