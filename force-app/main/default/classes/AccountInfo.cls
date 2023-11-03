public with sharing class AccountInfo {
    @AuraEnabled(cacheable=true)
    public static Account getAccountInfo(Id accountId) {
       return [SELECT Id,Name ,Phone FROM Account WHERE id=:accountId];
    }
}