describe('WaniKani Page', () => {
  it('should have WaniKani info from a Google Sheet', () => {
    // Navigate to page
    cy.visit('/jpn/wanikani');

    cy.contains('Summary');
    cy.contains('/ 60');
    cy.contains('Total');

    cy.contains('[+] Recent Unlocks').click();
    cy.get('#recent-unlocks-table > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no recent unlocks/g);

    cy.contains('[+] Critical Condition Items').click();
    cy.get('#critical-condition-table > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no items in Critical Condition/g);

    cy.contains('[+] Recently Burned Items').click();
    cy.get('#recently-burned-table > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no recently burned items/g);

    cy.contains('[+] Study Queue').click();
    cy.get('#study-queue-table-l > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no Lessons in the queue/g);
    cy.get('#study-queue-table-r0 > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no Reviews in the queue/g);

    cy.contains('[+] All Level Details').click();
    cy.get('#details-table > tbody > tr > td').eq(0)
      .contains(/[0-9]+|no details to display/g);
  });
});