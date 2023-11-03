import { LightningElement,api } from 'lwc';
import getOpportunitiesForContact from '@salesforce/apex/AccountOpportunityController.getOpportunitiesForContact';
import getCasesOfContacts from '@salesforce/apex/CasesOfContact.getCasesOfContacts';
export default class ChildContactList extends LightningElement {
    @api grandchildcontacts;
    selectedcontact;
    selectedContactId=null;
    opportunities = [];
    opportunities1 = [];
    cases=[];

    showoppcasesofcontacts(event){
        const contactId = event.currentTarget.dataset.contactId;
        
        if (this.selectedContactId === contactId) {
            // If the same child contact is clicked again, hide opportunities
            this.cases = null;
            this.selectedContactId = null;
        } else {
            this.selectedContactId=contactId;
            getOpportunitiesForContact({ contactId })
            .then(result => {
                this.opportunities1 = result;
                this.showOpportunities = true;
            })
            .catch(error => {
                // Handle the error
            });
            getCasesOfContacts({ contactId })
            .then(result => {
                this.cases = result;
            })
            .catch(error => {
                // Handle the error
            });
        }
    }
    
    showOpportunities(event) {
        const contactId = event.currentTarget.dataset.contactId;
        this.selectedcontact=contactId;
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