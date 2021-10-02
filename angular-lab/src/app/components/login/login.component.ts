import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.form = this.fb.group({
      //username: ['', Validators.email],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.authService.isLogged()) {
      await this.router.navigate(["home"]);
    }
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get("username")?.value;
        const password = this.form.get("password")?.value;
        this.loginInvalid = await !this.authService.login(username, password);

        if (!this.loginInvalid) {
          await this.router.navigate(["home"]);
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }
}
