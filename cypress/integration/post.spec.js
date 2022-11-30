

describe('POST /characters', function () {

    before(function(){
        cy.back2ThePast()
        cy.setToken()
    })

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
        })

    })

})
