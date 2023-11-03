public with sharing class OpportunityControllerAccount {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesForContact(Id contactId) {
        return [SELECT Id, Name FROM Opportunity WHERE ContactId = :contactId];
    }
}