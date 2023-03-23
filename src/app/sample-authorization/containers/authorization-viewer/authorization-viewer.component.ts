import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../security/user.service';
import {User} from '../../../security/user.interface';

@Component({
    selector: 'spotlight-test-sample-authorization-viewer',
    templateUrl: 'authorization-viewer.component.html'
})
export class AuthorizationViewerComponent implements OnInit {

    isLoggedIn: boolean;
    user: User;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getCurrentUserFromServer().subscribe((user: User) => {
            this.user = user;
            this.isLoggedIn = !!user;
        }, (error) => {
            console.error('Couldn\'t load user', error);
            this.user = null;
            this.isLoggedIn = false;
        });
    }

}
