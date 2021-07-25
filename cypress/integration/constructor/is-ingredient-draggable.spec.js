describe('drag and drop of ingredients works', function() {

  function dropIngredientByIndexInto (ingredientIndex, targetSelector) {
    cy.get('[class^=ingredient_card]').eq(ingredientIndex)
    .trigger('dragstart')

    cy.get(targetSelector)
    .trigger('drop')
  }

  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor by default', function() {
    cy.contains('Соберите бургер');
  });

  it('should check ingredients are loaded', function() {
    //expect(cy.get('[class^=ingredient_card]').length).to.be.greaterThan(0);
    cy.get('[class^=ingredient_card]').should('have.length', 15);
  });

  it('fillings should be draggable into constructor area', function() {
    const ingredientIndex = 3;
    const targetArea = '[class^=burger-constructor_constructor]';
    dropIngredientByIndexInto(ingredientIndex, targetArea);
    cy.get(targetArea).find('.constructor-element');
  });
  
    
  }); 