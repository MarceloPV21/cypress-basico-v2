Cypress._.times(3, function(){
    it('Check privacy policy in independent way', function(){

        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')  
           
    })
})