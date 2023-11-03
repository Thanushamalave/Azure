
public with sharing class ContactOrganogramController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId){
        return [SELECT Id,Name,ReportsToId,AccountId,Salutation,Email,Phone FROM Contact WHERE AccountId=:accountId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildContacts(String contactId){
        return [SELECT Id,Name,ReportsToId,Salutation,Email,Phone FROM Contact WHERE ReportsToId=:contactId];
    }
        @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesForContact(String contactId) {
        // Query opportunities related to the contact through the Account
        List<Opportunity> opportunities = [SELECT Id, Name, StageName, CloseDate
                                          FROM Opportunity
                                          WHERE Id IN (SELECT OpportunityId FROM OpportunityContactRole WHERE ContactId = :contactId)];
        return opportunities;
    }
          @AuraEnabled(cacheable=true)
        public static List<Case> getCasesByContactId(String contactId) {
            List<Case> cases = [SELECT Id, CaseNumber, Subject, Status, Description
                               FROM Case
                               WHERE ContactId = :contactId];
            return cases;
        }
    }