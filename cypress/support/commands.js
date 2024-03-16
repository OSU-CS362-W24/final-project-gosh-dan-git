// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("makeChart", () => {
    cy.get('#chart-title-input').type('My Chart');
    cy.get('#x-label-input').type('x');
    cy.get('#y-label-input').type('y');
    cy.get('.data-entry input').eq(2).type('1');
    cy.get('.data-entry input').eq(3).type('2');
    cy.get('#add-values-btn').click();
    cy.get('.data-entry input').eq(4).type('3');
    cy.get('.data-entry input').eq(5).type('4');
    cy.get('#chart-color-input').click();
    cy.get('#chart-color-input').eq(0).type('255');
    cy.get('#generate-chart-btn').click();
    cy.get('#chart-display').should('exist');
  });
  
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })