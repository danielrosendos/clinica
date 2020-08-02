import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CoreRoutingModule } from './core-routing.module';
import { IdentidadeComponent } from './identidade/identidade.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [NavigationComponent, IdentidadeComponent, PageNotFoundComponent, UserProfileComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
  ],
  exports: [
    NavigationComponent,
    IdentidadeComponent
  ]
})
export class CoreModule { }
