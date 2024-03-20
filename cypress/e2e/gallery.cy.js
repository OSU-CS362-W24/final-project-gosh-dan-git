/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Should be on home page (Gallery)', () => {
    cy.get('#gallery').should('exist')
  })


  it('Should take you to the line.html page', () => {
    cy.get('a[href="line.html"]').click()
    cy.url().should('include', '/line.html')

  })

  it('Should take you to the scatter.html page', () => {
    cy.get('a[href="scatter.html"]').click()
    cy.url().should('include', '/scatter.html')

  })

  it('Should take you to the bar.html page', () => {
    cy.get('a[href="bar.html"]').click()
    cy.url().should('include', '/bar.html')

  })

  it('Should take you to the bar.html page', () => {
    cy.get('a[href="bar.html"]').click()
    cy.url().should('include', '/bar.html')

  })

  it('Should show Three different charts in The gallery upon completion', () => {
    cy.get('#gallery').should('exist')
    // line chart
    cy.get('a[href="line.html"]').click()
    cy.url().should('include', '/line.html')
    cy.makeLineChart()
    cy.get('a[href="./"]').click()
    cy.url().should('eq', 'http://localhost:8080/')
    //scatter
    cy.get('a[href="scatter.html"]').click()
    cy.url().should('include', '/scatter.html')
    cy.makeScatterChart()
    cy.get('a[href="./"]').click()
    //bar
    cy.get('a[href="bar.html"]').click()
    cy.url().should('include', '/bar.html')
    cy.makeBarChart()
    cy.get('a[href="./"]').click()
    cy.get('.chart-card').should('have.length', 3)
    cy.checkChart(0)
    cy.get('#chart-title-input').should('have.value', 'My Line Chart')
    cy.get('a[href="./"]').click()
    cy.checkChart(1)
    cy.get('#chart-title-input').should('have.value', 'My Scatter Chart')
    cy.get('a[href="./"]').click()
    cy.checkChart(2)
    cy.get('#chart-title-input').should('have.value', 'My Bar Chart')
    cy.get('a[href="./"]').click()
  })


})