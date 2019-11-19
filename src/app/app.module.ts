import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule } from '@angular/common/http'; 

import { Config } from './_configs/main_config';
import { CommentsDialog } from './dialogs/comments/comments.component';
import { ToolbarComponent } from './_directives/toolbar/toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './_directives/post/post.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './_services/guards/auth-guard.service';
import { AuthProvider } from './_providers/auth-provider';
import { UserService } from './_services/user.service';
import { ChunkService } from './_services/chunk.service';
import { NewPostComponent } from './dialogs/new-post/new-post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewChunkComponent } from './dialogs/new-chunk/new-chunk.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentsDialog,
    ToolbarComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    NewPostComponent,
    ProfileComponent,
    NewChunkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule
  ],
  providers: [
    Config,
    AuthGuardService,
    AuthProvider,
    UserService,
    ChunkService
  ],
  entryComponents: [
    CommentsDialog,
    NewPostComponent,
    NewChunkComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
