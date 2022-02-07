describe('Contentful Page Dynamic Route', () => {
    it('should preview a draft Contentful Page', () => {
        cy.visit('/api/preview/page?secret=' + Cypress.env('PREVIEW_SECRET') + '&slug=forever-a-draft');
        cy.contains('Preview Mode');
        cy.contains('Heading 1 Test');
        cy.contains('Paragraph below heading.');
    });
    it('should have rendered a Privacy Policy', () => {
        cy.visit('/privacy');
        cy.contains('Preview Mode').should('not.exist');
        cy.contains('Privacy Policy');
        cy.contains('By email');
    });
    it("should throw a 401 if there is no slug or secret", () => {
        cy.request({
            url: "/api/preview/page",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
        cy.request({
            url: `/api/preview/page?secret=${Cypress.env('PREVIEW_SECRET')}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("should throw a 401 if the slug is bad", () => {
        cy.request({
            url: `/api/preview/page?secret=${Cypress.env('PREVIEW_SECRET')}&slug=known-bad-slug`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

});