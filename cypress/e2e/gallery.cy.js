/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Should be on home page (Gallery)', () => {
    cy.get('#gallery').should('exist')
  })


  it('Should take you to the line.html page', () => {
    cy.get('a[href="line.html"]').click();
    cy.url().should('include', '/line.html');

  })


})