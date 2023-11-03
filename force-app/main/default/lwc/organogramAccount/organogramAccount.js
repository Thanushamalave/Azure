

import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// import MaleImage from '@salesforce/resourceUrl/MaleImage';
// import FemaleImage from '@salesforce/resourceUrl/FemaleImage';
import getStakeHolders from "@salesforce/apex/ContactOrganogramController.getContacts";
import getChildContacts from '@salesforce/apex/ContactOrganogramController.getChildContacts';
import getOpportunitiesForContact from '@salesforce/apex/ContactOrganogramController.getOpportunitiesForContact';
import getCasesByContactId from '@salesforce/apex/ContactOrganogramController.getCasesByContactId';

export default class OrganogramAccount extends NavigationMixin(LightningElement) {

  @api recordId;
  opportunities=[];


  resultsMain = [];
  results=[];
  @track showModal = false;
  @track dataFlag = false;
  

@track opportunityCount;
@track conList = [];
@track showOppModal=false;
 @track showCaseModal = false;
@track childContacts=[];
@track caseCount;
@track hoveredContactId;
@track modalCases=[];
@track selectedChildContactId;
@track selectedContactId;
@track grandChildContacts=[];
showPopover = false;
showPopover1 = false;
opportunitiesChild=[];
showOpportunities1(event) {
        const contactId = event.currentTarget.dataset.contactId;
        getOpportunitiesForContact({ contactId })
            .then(result => {
                this.opportunitiesChild = result;
                this.showOpportunities = true;
                this.showPopover1 = this.opportunitiesChild.length > 0;
            })
            .catch(error => {
                // Handle the error
            });
    }

    hideOpportunities1() {
        this.opportunities1 = [];
        this.showOpportunities = false;
    }
showOpportunities(event) {
        const contactId = event.currentTarget.dataset.contactId;
        getOpportunitiesForContact({ contactId })
            .then(result => {
                this.opportunities = result;
                this.showOpportunities = true;
                this.showPopover = this.opportunities.length > 0;
            })
            .catch(error => {
                // Handle the error
            });
    }

    hideOpportunities() {
        this.opportunities = [];
        this.showOpportunities = false;
    }
 @wire(getStakeHolders,{accountId:'$recordId'})
wireContacts({error,data}){
    if(data){
        
        console.log('conList'+JSON.stringify(data));
        // ...
this.conList = data.map((contact) => {
    let imageSrc = ''; // Default image source

    // Check if salutation is present and assign Image__c accordingly
    if (contact.Salutation) {
        // console.log('Salutation: ' + contact.Salutation); 

        if (contact.Salutation === 'Mr.') {
            // imageSrc = MaleImage; // Replace with actual path
        } else if (contact.Salutation === 'Ms.' || contact.Salutation === 'Mrs.') {
            // imageSrc = FemaleImage; // Replace with actual path
        }
    }

    return {
        Id: contact.Id,
        Name: contact.Name,
        Email: contact.Email,
        Image__c: imageSrc,
    };
});
// ...

    }else if(error){
        console.log(error);
    }
}

  handleClick(event) {
        const contactId = event.target.dataset.contactId;
        console.log('contact Id on click of show child',contactId);
        this.isShowModal = true;
        if (this.selectedContactId === contactId) {
            // If the same child contact is clicked again, hide opportunities
            this.grandChildContacts = null;
            this.selectedContactId = null;
        } else {
            this.selectedContactId = contactId;
            getChildContacts({ contactId: this.selectedContactId})
                .then(result => {
                    console.log('child Contacts'+result);
                    this.grandChildContacts =result.map((contact) => {
    let imageSrc = ''; // Default image source
    // Check if salutation is present and assign Image__c accordingly
    if (contact.Salutation) {
        // console.log('Salutation: ' + contact.Salutation); 
        if (contact.Salutation === 'Mr.') {
            // imageSrc = MaleImage; // Replace with actual path
        } else if (contact.Salutation === 'Ms.' || contact.Salutation === 'Mrs.') {
            // imageSrc = FemaleImage; // Replace with actual path
        }
       }
    return {
        Id: contact.Id,
        Name: contact.Name,
        Email: contact.Email,
        Image__c: imageSrc,
    };
});
  
        })
                .catch(error => {
                    console.log(error);
                });
        }
  }

  closeModal() {
    this.showModal = false;
  }
 
    handleContactMouseOver(event) {
  this.hoveredContactId = event.target.dataset.contactId;
  hello=true;
  console.log('Contact ID:', this.hoveredContactId);
  
    this.showOppModal = true;
    console.log('showOppModal'+this.showOppModal);
 
  }

       
     @wire(getOpportunitiesForContact, { contactId: '$hoveredContactId' })
    wiredOpportunities({ error, data }) {
        if (data) {
            this.modalOpportunities = data;
            this.opportunityCount=data.length;
            console.log('modalOpportunities'+this.modalOpportunities);

        } else if (error) {
            console.log('Error fetching opportunities', error);
        }
    }

  handleChildContactSelected(event) {
              this.selectedChildContactId = event.target.dataset.contactId;
        console.log('selectedChildContactId'+selectedChildContactId);
        this.showCaseModal = true;
        console.log('showcaseModal'+this.showCaseModal);
    }

    @wire(getCasesByContactId,{contactId: '$selectedChildContactId' })
    wiredCases({ error, data }) {
        if (data) {
            this.modalCases = data;
            this.caseCount=data.length;

            console.log('modalCases' +JSON.stringify(this.modalCases));
            this.showCaseModal = true;
        } else if (error) {
            console.log('Error fetching cases', error);
        }
    }
 
handleContactClick(event) {
      // Get the contactId from the data-contact-id attribute of the clicked node
      const contactId = event.currentTarget.dataset.contactId;

      // Now, you can use the contactId in your JavaScript logic
      console.log("Selected Contact Id: " + contactId);
      
    
      // getchildStakeHolders({ contactId:contactId })

      // .then(result=> {
      //     this.childContacts= result;
      //     console.log('this.childContacts'+this.childContacts);
      // })
      // .catch(error=> {
      //     console.error('Error fetching opportunities', error);
      // })
  }

   
     navigateToContactRecord(event){
        const contactId = event.target.dataset.contactId;
        if (contactId) {
            this[NavigationMixin.Navigate]({
                type: "standard__recordPage",
                attributes: {
                    recordId: contactId,
                    objectApiName: 'Contact',
                    actionName: "view"
                }
            });
        }
    }

    navigateToCaseRecord(event) {
        const caseId = event.target.dataset.caseId;
        if (caseId) {
            this[NavigationMixin.Navigate]({
                type: "standard__recordPage",
                attributes: {
                    recordId: caseId,
                    objectApiName: 'Case',
                    actionName: "view"
                }
            });
        }
    }
     navigateToOpportunityRecord(event) {
        const opportunityId = event.target.dataset.opportunityId;
        if (opportunityId) {
            this[NavigationMixin.Navigate]({
                type: "standard__recordPage",
                attributes: {
                    recordId:opportunityId,
                    objectApiName: 'Opportunity',
                    actionName: "view"
                }
            });
        }
    }
    

  closeOppModal() {
      this.showOppModal = false;
      const toolTipDiv = this.template.querySelector('div.ModelTooltip');
        toolTipDiv.style.opacity = 0;
        toolTipDiv.style.display = "none";
  }


  closeCaseModal() {
      
        this.showCaseModal = false;
    }

}