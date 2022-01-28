describe('Contentful Page', () => {
    it('should preview a draft Contentful Page', () => {
        cy.visit('/api/preview?secret=' + Cypress.env('PREVIEW_SECRET') + '&slug=forever-a-draft');
        cy.contains('Preview Mode');
        cy.contains('Heading 1 Test');
        cy.contains('Paragraph below heading.');
    });
});