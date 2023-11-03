import { LightningElement ,api , wire ,track} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import getOpportunitiesForContact from '@salesforce/apex/AccountOpportunityController.getOpportunitiesForContact';
import getChildContacts from '@salesforce/apex/ChildContact.getChildContacts';
export default class AccountInfo extends LightningElement {
    @api recordId;
    opportunities = [];
    childContacts = [];
    grandChildContacts=[];
    @api selectedContactId = null;
    selectedContacts=null;
    showChildContacts = false;
    isDisabled=false;

    @wire(getContacts, { accountId: '$recordId' })
    wiredChildContacts({ error, data }) {
        if (data) {
            this.childContacts = data;
        } else if (error) {
            // Handle the error
        }
    }
  
    showChildContacts(event) {
        const contactId = event.target.dataset.contactId;
        this.selectedContactId = contactId;
        isDisabled=true;
        getChildContacts({ contactId })
            .then(result => {
                this.grandChildContacts = result;
                this.showChildContacts = true;
            })
            .catch(error => {
                // Handle the error
            });
    }
    
handleClick(event) {
        const contactId = event.target.dataset.contactId;
        this.isShowModal = true;
        if (this.selectedContactId === contactId) {
            // If the same child contact is clicked again, hide opportunities
            this.grandChildContacts = null;
            this.selectedContactId = null;
        } else {
            this.selectedContactId = contactId;
            getChildContacts({ contactId })
                .then(result => {
                    this.grandChildContacts = result;
                })
                .catch(error => {
                    // Handle the error
                });
        }
    }
    showOpportunities(event) {
        const contactId = event.currentTarget.dataset.contactId;
        getOpportunitiesForContact({ contactId })
            .then(result => {
                this.opportunities = result;
                this.showOpportunities = true;
            })
            .catch(error => {
                // Handle the error
            });
    }

    hideOpportunities() {
        this.opportunities = [];
        this.showOpportunities = false;
    }

    
}