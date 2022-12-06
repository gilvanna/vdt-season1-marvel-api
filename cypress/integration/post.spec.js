

describe('POST /characters', function () {

    before(function(){
        cy.setToken()
    })

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Tony Stark',
            alias: 'Homem de Ferro',
            team: ['vingadores'],
            active: false
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context ('quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function(){
            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(201)
                })

        })

        it('não deve cadastrar duplicado', function(){
            
            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })

    it('campo name é obrigatório', function(){

        const character = {
            alias: 'Homem Aranha',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"name\" is required')
            })
    })

    it('campo alias é obrigatório', function(){

        const character = {
            name: 'Peter Parker',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"alias\" is required')
            })
    })

    it('campo team é obrigatório', function(){

        const character = {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"team\" is required')
            })
    })

    it('campo active é obrigatório', function(){

        const character = {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['vingadores']
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"active\" is required')
            })
    })

})
