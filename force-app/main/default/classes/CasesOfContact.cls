public with sharing class CasesOfContact {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesOfContacts(Id contactId) {
        // Query opportunities related to the specified contact
        List<Case> cases = [SELECT Id, Subject, Status, CreatedDate, Origin, CaseNumber
                                    FROM Case
                                     WHERE ContactId = :contactId];
        return cases;
    }
}