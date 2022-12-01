

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
})