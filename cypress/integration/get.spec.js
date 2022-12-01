

describe('GET /characters', function(){

    before(function(){
       // cy.back2ThePast()
        cy.setToken()
    })

    it('deve retornar uma lista de personagens', function() {

        cy.getCharacters().then(function(response){
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
        })
    })
})