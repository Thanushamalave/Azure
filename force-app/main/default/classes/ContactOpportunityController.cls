public with sharing class ContactOpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getParentContacts(String contactId) {
    
  
    Contact parentId= [SELECT ReportsToId FROM Contact WHERE Id =:contactId limit 1];
        return [SELECT Id, Name FROM Contact WHERE Id= :parentId.ReportsToId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildContacts(Id contactId) {
        return [SELECT Id, Name FROM Contact WHERE ReportsTo.Id = :contactId];
    }
    
}