describe('DELETE /characters/id', function(){

    const tochaHumana = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['quarteto fantástico'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){

        before(function(){
            cy.postCharacter(tochaHumana).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover personagem pelo id', function(){
            const id = Cypress.env('chracterId')

            cy.deleteCharacterById(id).then(function(response){
                expect(response.status).to.eql(204)
            })
        })

        //para confirmar que foi deletado
        after(function(){
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })

    it('deve retornar 404 ao remover por id não cadastrado', function(){
        const id = '638a071e8f05638cbc00a467'

            cy.deleteCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
    })

})