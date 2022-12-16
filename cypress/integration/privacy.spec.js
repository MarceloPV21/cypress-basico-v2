it('Check privacy policy in independent way', function(){

    cy.visit('./src/privacy.html')
    cy.contains('Talking About Teting').should('be.visible')  
       
})