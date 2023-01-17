import { ShoppingComplateDialogComponent, ShoppingCompleteState } from './../../../dialogs/shopping-complate-dialog/shopping-complate-dialog.component';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from './../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogService } from './../../../services/common/dialog.service';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../../services/ui/custom-toastr.service';
import { Create_Order } from './../../../contracts/order/create_order';
import { OrderService } from './../../../services/common/models/order.service';
import { Update_Basket_Item } from './../../../contracts/basket/update_basket_item';
import { BasketService } from './../../../services/common/models/basket.service';
import { List_Basket_Item } from './../../../contracts/basket/list_basket_item';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;


@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService,
    private orderService: OrderService, private toastrService: CustomToastrService, private router: Router, private dialogService: DialogService) {
    super(spinner);
  }
  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.get()
    console.log(this.basketItems);
    this.hideSpinner(SpinnerType.BallAtom)
    debugger
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)
  }

  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId);

        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));
        $("#basketModal").modal("show");
      }
    });
  }

  shoppingComplete() {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingComplateDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        const order: Create_Order = new Create_Order();
        order.address = "Yenimahalle";
        order.description = "Falanca filanca...";
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.BallAtom);
        this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    });
  }
}
