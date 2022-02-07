describe('Home Page', () => {
    it('should contain the site title', () => {
        // Start from the index page
        cy.visit('/');
        cy.contains('BachMacintosh');
        cy.get("#footer").contains("Copyright")
    });
});