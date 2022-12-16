it('Check privacy policy in independent way', function(){

    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')  
       
})