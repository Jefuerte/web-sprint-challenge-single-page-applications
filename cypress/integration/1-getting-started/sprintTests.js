describe('App', () => {


    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

it('checks text in name input', () => {
    cy.get('input[id=name-input]')
    .should('have.value', '')
    .type('peter parker')
    .should('have.value', 'peter parker')
})

it('checks toppings', () => {
    cy.get('input[id=toppings]').check()
})

it('submit button', () => {
    cy.get('button[id=order-button]').should('be.disabled')
})

})
