/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT',function(){
    this.beforeEach(function(){
        cy.visit('/src/index.html')
    })

it('verifica o título da aplicação', function(){
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})

it('preencher os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Figueiredo')
    cy.get('#email').type('test@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Et fugit soluta qui suscipit culpa qui omnis doloribus eum dolor fugiat.', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
})

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Figueiredo')
    cy.get('#email').type('test@gmail,com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Campo telefone continua vazio quando preenchido com valor não-numerico', function(){
    cy.get('#phone').type('abcdefghij').should('have.value', '')    
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Figueiredo')
    cy.get('#email').type('test@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type('Rodrigo').should('have.value', 'Rodrigo').clear().should('have.value','')
    cy.get('#lastName').type('Figueiredo').should('have.value', 'Figueiredo').clear().should('have.value','')
    cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com').clear().should('have.value','')
    cy.get('#phone').type('999999999').should('have.value', '999999999').clear().should('have.value','')
})

it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Envia o formulário com suceso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
})

it('Seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
})

it('Seleciona um produto (YouTube) por seu valor (value)', function(){
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

it('Seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select(1).should('have.value', 'blog')
})

it('Marca o tipo de atendimento "Feedback"', function(){
    cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
})

it('Marca cada tipo de atendimento', function(){
    cy.get('[type="radio"]').should('have.length', 3)
    .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })  
})

it('Marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('[type="checkbox"]').last().check().should('be.checked')
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.error').should('be.visible')
})

it('Seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('Seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('Seleciona um arquivo simulando um drag-and-drop', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
})

it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
})

})
