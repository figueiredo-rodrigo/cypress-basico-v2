Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Figueiredo')
    cy.get('#email').type('test@gmail.com')
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.', {delay: 0})
    cy.contains('button', 'Enviar').click()
})