

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

describe('GET /characters/id', function(){
    
    const steveRogers = {
        name: 'Steve Rogers',
        alias: 'Capitão América',
        team: ['vingadores'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){

        before(function(){
            cy.postCharacter(steveRogers).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar personagem pelo id', function(){
            const id = Cypress.env('chracterId')

            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Capitão América')
                expect(response.body.team).to.eql(['vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })
    })

    it('deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '638a071e8f05638cbc00a467'

            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
    })

})