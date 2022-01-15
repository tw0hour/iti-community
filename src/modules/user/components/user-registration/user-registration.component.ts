import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {LocalUserQueries} from "../../services/platform/local/user.queries.local";
import {NzMessageService} from "ng-zorro-antd/message";

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  providers : [ LocalUserQueries ],
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private localUserQueries: LocalUserQueries,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    const isExist = await this.localUserQueries.exists(this.model.username);
    if (isExist) {
      this.message.error("Ce nom d'utilisateur est déja utilisé");
      return;
    }

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      return;
    }

    // TODO Enregistrer l'utilisateur via le UserService
    const result = await this.userService.register(this.model.username, this.model.password);
    console.log(result);
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/splash/login']);
  }
}
