import { LightningElement ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class OppCaseOfContact extends  NavigationMixin(LightningElement){
    @api cases;
    @api opportunities1;
    navigateToCaseDetail(event) {
        // Replace 'your-case-record-id' with the actual Case record Id
        const caseRecordId = event.currentTarget.dataset.contactId;;

        // Generate the URL for the Case detail page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: caseRecordId,
                actionName: 'view',
            },
        });
    }
}