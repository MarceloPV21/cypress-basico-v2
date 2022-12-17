///<reference types="Cypress" /> 



// This command above is usefull to allow autocomplete



describe('Call center TAT', function() {
    
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    
    Cypress._.times(3, function(){
        it('Check application title', function() {
        
        
            cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
            
        })
    })
    


    it('Fill required fields and send the form', function(){
        
        cy.clock() //Freeze clock

        cy.get("#firstName").type("Test")
        cy.get("#lastName").type("Lastname")
        cy.get("#email").type("marcelopv@gmail.com")
        cy.get("#open-text-area").type("Random text here asidjaodiasidjasiodiasdoijaiodjaosijdaoisjdoiasijdiaosjdioasjdasi", { delay: 0 })
        //cy.get(".button").click()  Getting by class
        //cy.get('button[type="submit"]').click() // Getting by type
       
        cy.contains('button', 'Env').click() // Example replacing get by contains
        cy.get(".success").should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get(".success").should('not.be.visible')

    })

    it('Send invalid email', function(){

        cy.get("#firstName").type("Test")
        cy.get("#lastName").type("Lastname")
        cy.get("#email").type("marcelopv@")
        cy.get("#open-text-area").type("Random text here asidjaodiasidjasiodiasdoijaiodjaosijdaoisjdoiasijdiaosjdioasjdasi", { delay: 0 })
        cy.get('button[type="submit"]').click() 
        cy.get(".error").should('be.visible')

    })

    it('Send non numeric value the field should be keep empty', function(){

        cy.get("#phone").type("jklsdfjkasdnfj").should('have.value','')
        

    })

    it('Display error message when phone number is required', function(){

        cy.get("#firstName").type("Test")
        cy.get("#lastName").type("Lastname")
        cy.get("#email").type("marcelopv@gmail.com")
        cy.get("#phone-checkbox").check()
        //cy.get("#phone-checkbox").click() // You can use click to check a checkbox element as well
        cy.get("#open-text-area").type("Random text here asidjaodiasidjasiodiasdoijaiodjaosijdaoisjdoiasijdiaosjdioasjdasi", { delay: 0 })
        cy.get('button[type="submit"]').click() 
        cy.get(".error").should('be.visible')

    })

    it('Fill and clear fields (name, lastname, email, phone)', function(){

        cy.get("#firstName").type("Test").should('have.value','Test').clear().should('have.value','')
        cy.get("#lastName").type("Lastname").should('have.value','Lastname').clear().should('have.value','')
        cy.get("#email").type("marcelopv@gmail.com").should('have.value','marcelopv@gmail.com').clear().should('have.value','')
        cy.get("#phone").type("1233").should('have.value','1233').clear().should('have.value','')
        cy.get("#phone-checkbox").click()
        cy.get("#open-text-area").type("Random text here").should('have.value','Random text here').clear().should('have.value','')
    })

    it('Display error message after submit form without fill out required fields)', function(){

        cy.get('button[type="submit"]').click() 
        cy.get(".error").should('be.visible')
    
    })

    it('Send form with succeed using a custom command', function(){

       cy.fillMandatoryFieldsAndSubmit()
       cy.get(".success").should('be.visible')

    })

    it('Select a product (Youtube) by text', function (){

        cy.get('#product').select('YouTube')
            .should('have.value','youtube')
    })

    it('Select a product by value', function (){

        cy.get('#product').select('mentoria')
            .should('have.value','mentoria')
    })

    it('Select a product by id', function (){

        cy.get('#product').select(1)
            .should('have.value','blog')
    })

    it('Check service type "Feedback"',function(){

        //cy.get('input[type="radio"').check("feedback") Get by value on the check property
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    it('Check all type of service',function(){

        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
            
    })

    it('Check all checkbox, after uncheck the last one',function(){

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('Select file from fixtures folder', function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Select file simulating drag-and-drop', function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .then(input =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Select file using fixture that have an alias', function(){

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example.json')
            })
           
    })

    it('Check the privacy policy open on a new tab without click on it', function(){

        cy.get('a[href="privacy.html"').should('have.attr','target','_blank')
           
    })
    
    it('Accessing privacy policy page removing target and click on link', function(){

        //cy.get(#privacy a) Other way to get this element
        cy.get('a[href="privacy.html"')
            .invoke('removeAttr','target')
            .click()
            //1st way
            //cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')  
            //2nd way
        cy.contains('Talking About Testing').should('be.visible')    
           
    })

   
    it('Show and hide success and error messages using .invoke', () =>{
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('Fill text area using invoke command',() =>{

        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

    })

    it('Make http request', ()=>{


        /* First way 
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).should((response) => {
            console.log(response)
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).contain('CAC TAT')
        })
        */

        // Other way using object destructuring
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
            console.log(response)
            const { status, statusText, body } = response //object destructuring
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.include('CAC TAT')
        })

        })


      it.only('Find the cat', () =>{

            cy.get('#cat')
                .should('not.be.visible')
                .invoke('show')
                .should('be.visible')
            cy.get('#title')
                .invoke('text', 'DOG TAT')
          
      

        })

      })  






