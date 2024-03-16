/// <reference types="cypress" />

describe('Scatter.html basic operations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/scatter.html')
    })
  
    it('Should make a simple Scatter chart', () => {
        cy.makeChart()
        cy.get('#save-chart-btn').click()
        cy.get('a[href="./"]').click();
        cy.url().should('eq', 'http://localhost:8080/')
        cy.get('.chart-card').should('have.length', 1);
        cy.get('.chart-card').eq(0).click()
        cy.url().should('include', '/scatter.html');
        cy.get('#chart-title-input').should('have.value', 'My Chart');
        cy.get('#chart-title-input').type('My Scatter Chart');
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(6).type('5')
        cy.get('.data-entry input').eq(7).type('6')
        cy.get('#generate-chart-btn').click()
        cy.get('#save-chart-btn').click()
        cy.get('a[href="./"]').click();
        cy.url().should('eq', 'http://localhost:8080/')
        cy.get('.chart-card').should('have.length', 1);

        
    })

    it('Should display error message if required fields are not filled', () => {
        cy.get('#generate-chart-btn').click()
        cy.on('window:alert', (message) => {
        expect(message).to.equal('Error: No data specified!');
        });
    })

    it('Should allow saving multiple charts', () => {
        cy.makeChart()
        cy.get('#save-chart-btn').click()
        cy.get('#generate-chart-btn').click()
        cy.get('#save-chart-btn').click()
        cy.get('#chart-title-input').clear().type('My Scatter Chart 2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(6).type('5')
        cy.get('.data-entry input').eq(7).type('6')
        cy.get('#generate-chart-btn').click()
        cy.get('#save-chart-btn').click()
        cy.get('a[href="./"]').click();
        cy.get('.chart-card').should('have.length', 2);
    })

    it('Should take you to the bar chart upon press', () => {
        cy.get('a[href="bar.html"]').click();
        cy.url().should('include', '/bar.html')
    })

    it('Should take you to the line chart upon press', () => {
        cy.get('a[href="line.html"]').click();
        cy.url().should('include', '/line.html')
    })

})