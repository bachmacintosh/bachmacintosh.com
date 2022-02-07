describe('GTA Online Page', () => {
    it('should have GTA Online stats from a Google Sheet', () => {
        // Navigate to page
        cy.visit('/gaming/gta-online');

        cy.contains('Summary');
        cy.contains('Total Property Value');
        cy.contains('Grind Days Remaining');

        cy.contains('[+] Wish List').click();
        cy.contains('Reserve for Future DLC');

        cy.contains('[+] Earnings').click();
        cy.contains('1/1');

        cy.contains('[+] Properties').click();
        cy.contains('Agency');

        cy.contains('[+] Vehicles').click();
        cy.contains('Champion');

        cy.contains('[+] Safes').click();
        cy.contains('$210,000');
    });
});