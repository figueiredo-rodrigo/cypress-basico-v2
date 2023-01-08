it('Testa a página da política de privacidade de forma independente',function(){
    cy.visit('./cypress-basico-v2/src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
    })