import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import { ToastrMessageType, ToastrPosition } from './../../../services/ui/custom-toastr.service';
import { Create_User } from './../../../contracts/users/create_user';
import { UserService } from './../../../services/common/models/user.service';
import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
  }

  submitted: boolean = false;
  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  // get koydugumuz için property yoksa fonks olurdu
  get component() {
    return this.frm.controls;
  }

  async onSubmit(data: User) {
    this.submitted = true;

    debugger;
    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(data);
    console.log(result);
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })

  }
}