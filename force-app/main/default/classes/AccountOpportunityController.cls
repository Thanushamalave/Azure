public with sharing class AccountOpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesForContact(Id contactId) {
        // Query opportunities related to the specified contact
        List<Opportunity> opportunities = [SELECT Id, Name, CloseDate, Amount
                                          FROM Opportunity
                                          WHERE ContactId = :contactId];
        return opportunities;
    }
}