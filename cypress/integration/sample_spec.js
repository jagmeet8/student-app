


describe ('Visits student-app ', function () {
    
    it('Visits student-app', function() {
        cy.visit('http://localhost:3000/courses')   
       })
}) 


describe('Checks Responsive', function (){
    it('Checks Responsive', function(){
        cy.viewport('iphone-6+')
        cy.wait(200)
    })
})       

describe('Search Courses', function(){
    it('Search Courses', function(){
        const text= 'Biomedical Science';
        cy.visit('http://localhost:3000/courses')
        cy.get('#app_course').type(text).should('have.value',text)
    })
})

describe('Click Add Button', function(){
    it('Click Add Button',function () {
        cy.get('button').click()
        cy.focused().click()
        cy.contains('Add').click()

    })
})


describe ('Navigate to Account', function() {
    it("Navigate to Account", function() {
      cy.visit('http://localhost:3000/courses')
      cy.contains('Account').click()
      cy.url().should('include', '/account')
    })
  })


