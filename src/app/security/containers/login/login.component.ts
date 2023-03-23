import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'spotlight-test-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    status: string;
    statusText: string;

    constructor(private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route
            .queryParams
            .subscribe((params: {[key: string]: string}) => {
                this.status = params['status'];
                this.statusText = params['statusText'];
            });
    }

    handleSubmit(loginForm: NgForm): void {
        this.userService.login((loginForm.value as {username: string}).username, (loginForm.value as {password: string}).password);
    }

}
