public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId) {
        return [SELECT Id, Name,Email, Phone, Birthdate,LeadSource,Image_URL__c FROM Contact WHERE AccountId = :accountId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getOrganogramData(Id accountId) {
        // Fetch contacts associated with the account and their child contacts
        // Create a custom field on Contact (e.g., Reports_To__c) to specify the reporting hierarchy

        List<Contact> organogramData = [SELECT Id, Name,ReportsTo.Id FROM Contact WHERE AccountId = :accountId];

        return organogramData;
    }
}