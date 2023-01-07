import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { BasketsModule } from './baskets/baskets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    // LoginModule 
  ]
})
export class ComponentsModule { }
