import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule,
    UserModule
  ]
})
export class ComponentsModule { }
