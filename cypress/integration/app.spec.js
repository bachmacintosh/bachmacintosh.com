describe('Home Page', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('/');

        // Find a link with a href attribute containing "about" and click it
        cy.contains('BachMacintosh');
    });
});