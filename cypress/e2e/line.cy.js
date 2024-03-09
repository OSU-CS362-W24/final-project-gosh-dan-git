/// <reference types="cypress" />

describe('Line.html basic operations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/line.html')
    })
  
    it('Should make a simple line chart', () => {
        cy.get('#chart-title-input').type('My Line Chart')

        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        // x and y labels are in the data entry????
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
        cy.get('#chart-color-input').invoke('val', '#ff0000').trigger('input');
        cy.get('#generate-chart-btn').click()

        cy.get('#chart-display').should('exist')
    })

    it('Should clear when buttom is pressed', () => {
        cy.get('#chart-title-input').type('My Line Chart')

        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        // x and y labels are in the data entry????
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
      
        cy.get('#generate-chart-btn').click()

        cy.get('#chart-display').should('exist')

        cy.get('#clear-chart-btn').click()
        cy.get('#chart-display').should('not.exist')
    })
  })