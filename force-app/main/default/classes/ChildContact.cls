public with sharing class ChildContact {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildContacts(Id contactId) {
        return [SELECT Id, Name, Email, Phone,Image_URL__c FROM Contact WHERE ReportsTo.Id = :contactId];
    }
    }