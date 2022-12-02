

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Carol Danvers',
            alias: 'Capitã Marvel',
            team: ['novos vingadores'],
            active: true
        },
        {
            name: 'Natalia Romanova',
            alias: 'Viúva Negra',
            team: ['vingadores'],
            active: false
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['novos vingadores'],
            active: true
        }
    ]

    before(function () {
        cy.back2ThePast()
        cy.setToken()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            //validacao de tipo de dado, so ve se é array
            expect(response.body).to.be.a('array')
            //verifica se o array de super heróis é maior que 0
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function(){
        cy.searchCharacters('Natalia').then(function(response){
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Viúva Negra')
            expect(response.body[0].team).to.eql(['vingadores'])
            expect(response.body[0].active).to.eql(false)

        })
    })
})