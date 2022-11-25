import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/seguridad/general/login/login.component';
import { RecuperarPassComponent } from './modulos/seguridad/general/recuperar-pass/recuperar-pass.component';
import { RegistrarComponent } from './modulos/seguridad/usuarios/registrar/registrar.component';
import { ConsultarComponent } from './modulos/seguridad/usuarios/consultar/consultar.component';
import { ModificarComponent } from './modulos/seguridad/usuarios/modificar/modificar.component';
import { EliminarComponent } from './modulos/seguridad/usuarios/eliminar/eliminar.component';
import { HeaderComponent } from './public/plantilla/header/header.component';
import { NavBarComponent } from './public/plantilla/nav-bar/nav-bar.component';
import { FooterComponent } from './public/plantilla/footer/footer.component';
import { HomeComponent } from './public/general/home/home.component';
import { NotFoundComponent } from './public/errores/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarPassComponent,
    RegistrarComponent,
    ConsultarComponent,
    ModificarComponent,
    EliminarComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
