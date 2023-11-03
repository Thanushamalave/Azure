public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesForContact(Id contactId) {
        return [SELECT Id, Name, Amount FROM Opportunity WHERE ContactId = :contactId];
    }
}
