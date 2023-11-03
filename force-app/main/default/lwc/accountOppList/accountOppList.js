import { LightningElement ,api} from 'lwc';

export default class AccountOppList extends LightningElement {
    @api opportunities;
    @api selectedContactId;
}