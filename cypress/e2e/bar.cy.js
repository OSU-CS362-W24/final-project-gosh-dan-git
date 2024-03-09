/// <reference types="cypress" />

describe('Bar.html basic operations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/bar.html')
    })
  
    it('Should make a simple bar chart', () => {
        cy.get('#chart-title-input').type('My Bar Chart')

        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        // x and y labels are in the data entry????
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
        cy.get('#chart-color-input').click()
        cy.get('#chart-color-input').eq(0).type('255')
        cy.get('#generate-chart-btn').click()

        cy.get('#chart-display').should('exist')
    })

    it('Should clear chart when button is pressed', () => {
        cy.get('#chart-title-input').type('My Bar Chart')
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
        cy.get('#chart-title-input').type('My Bar Chart')
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

    it('Should take you back to the bar chart of the saved image upon click', () => {
        cy.get('#chart-title-input').type('My Bar Chart')
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
        cy.get('.chart-card').eq(0).click()
        cy.url().should('include', '/bar.html');
        cy.get('#chart-title-input').should('have.value', 'My Bar Chart');
        cy.get('#x-label-input').should('have.value', 'x');
        cy.get('#y-label-input').should('have.value', 'y');
        cy.get('.data-entry input').eq(2).should('have.value', '1');
        cy.get('.data-entry input').eq(3).should('have.value', '2');
        cy.get('.data-entry input').eq(4).should('have.value', '3');
        cy.get('.data-entry input').eq(5).should('have.value', '4');
    })

    it('Should display error message if required fields are not filled', () => {
        cy.get('#generate-chart-btn').click()
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Error: No data specified!');
        });
    })

    it('Should allow saving multiple charts', () => {
        // Test to ensure multiple charts can be saved and viewed in the Gallery
        cy.get('#chart-title-input').type('My Bar Chart 1')
        cy.get('#x-label-input').type('x') 
        cy.get('#y-label-input').type('y')
        cy.get('.data-entry input').eq(2).type('1')
        cy.get('.data-entry input').eq(3).type('2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(4).type('3')
        cy.get('.data-entry input').eq(5).type('4')
        cy.get('#generate-chart-btn').click()
        cy.get('#save-chart-btn').click()
        cy.get('#chart-title-input').clear().type('My Bar Chart 2')
        cy.get('#add-values-btn').click()
        cy.get('.data-entry input').eq(6).type('5')
        cy.get('.data-entry input').eq(7).type('6')
        cy.get('#generate-chart-btn').click()
        cy.get('#save-chart-btn').click()
        cy.get('a[href="./"]').click();
        cy.get('.chart-card').should('have.length', 2);
    })

    it('Should take you to the line chart upon press', () => {
        cy.get('a[href="line.html"]').click();
        cy.url().should('include', '/line.html')
    })

    it('Should take you back to the scatter chart upon press', () => {
        cy.get('a[href="scatter.html"]').click();
        cy.url().should('include', '/scatter.html')
    })

})
