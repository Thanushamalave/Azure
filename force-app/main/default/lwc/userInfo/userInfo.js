
// userDisplay.js
import { LightningElement, wire, track ,api} from 'lwc';

import getCurrentUser from '@salesforce/apex/Controller.getCurrentUser';
import getUsersAboveCurrentUser from '@salesforce/apex/Controller.getUsersAboveCurrentUser';
import getUsersBelowCurrentUser from '@salesforce/apex/Controller.getUsersBelowCurrentUser';

export default class UserInfo extends LightningElement {
    @api currentUser;
    @api usersAboveCurrentUser;
    @api usersBelowCurrentUser;

    @wire(getCurrentUser)
    loadCurrentUser({ data, error }) {
        if (data) {
            this.currentUser = data;
        } else if (error) {
            console.error('Error loading current user', error);
        }
    }

    @wire(getUsersAboveCurrentUser)
    loadUsersAboveCurrentUser({ data, error }) {
        if (data) {
            this.usersAboveCurrentUser = data;
        } else if (error) {
            console.error('Error loading users above current user', error);
        }
    }

    @wire(getUsersBelowCurrentUser)
    loadUsersBelowCurrentUser({ data, error }) {
        if (data) {
            this.usersBelowCurrentUser = data;
        } else if (error) {
            console.error('Error loading users below current user', error);
        }
    }
}
