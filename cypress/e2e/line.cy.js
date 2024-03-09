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

    it('Should clear chart when buttom is pressed', () => {
        cy.get('#chart-title-input').type('My Line Chart')
        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
        cy.get('#generate-chart-btn').click()

        cy.get('#chart-display').should('exist')
        cy.get('#clear-chart-btn').click()

        // should check if chart is empty
        cy.get('#chart-title-input').should('have.value', '');
        cy.get('#x-label-input').should('have.value', '');
        cy.get('#y-label-input').should('have.value', '');
        cy.get('.data-entry input').eq(2).should('have.value', '');
        cy.get('.data-entry input').eq(3).should('have.value', '');
    })

    it('Should save the chart, and should be viewable in Gallery', () => {
        cy.get('#chart-title-input').type('My Line Chart')
        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
        cy.get('#chart-color-input').invoke('val', '#ff0000').trigger('input');
        cy.get('#generate-chart-btn').click()
        cy.get('#chart-display').should('exist')

        cy.get('#save-chart-btn').click()
        cy.get('a[href="./"]').click();
        cy.get('.chart-card').should('have.length', 1);
        
  })

})