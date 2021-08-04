describe('drag and drop of ingredients works', function() {

  const FILLING_INDEX = 3;
  const BUN_INDEX = 1;

  function dropIngredientIntoTarget(ingredientIndex: number, targetSelector: string) {
    cy.get('[class^=ingredient_card]')
    .eq(ingredientIndex)
    .trigger('dragstart')

    cy.get(targetSelector)
    .trigger('drop')
  }

  function checkDragIsCorrect(ingredientIndex: number, expectedCount: number) {
    cy.get('[class^=ingredient_card]').eq(ingredientIndex).as('draggableElement');

    cy.get('@draggableElement')
    .find('[class^=ingredient_name]')
    .invoke('text').then((ingredientTitle) => {
      
      cy.get('[class^=burger-constructor_constructor]').as('targetArea');
      
      cy.get('@targetArea')
      .first()
      .contains(ingredientTitle);

    });

    cy.get('@draggableElement')
    .first()
    .contains(expectedCount);
  }

  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('opens constructor page', function() {
    cy.contains('Соберите бургер');
  });

  it('loads ingredients', function() {
    cy.get('[class^=ingredient_card]').should('have.length.greaterThan', 0);
  });

  it('drags a filling into constructor', function() {
    const ingredientIndex = FILLING_INDEX;
    const targetArea = '[class^=burger-constructor_constructor]';

    dropIngredientIntoTarget(ingredientIndex, targetArea);
    checkDragIsCorrect(ingredientIndex, 1);
  });
   
  it('increases counter of the dragged filling', function() {
    const ingredientIndex = FILLING_INDEX;
    const targetArea = '[class^=burger-constructor_constructor]';

    dropIngredientIntoTarget(ingredientIndex, targetArea);

    cy.get('[class^=ingredient_card]')
    .eq(ingredientIndex)
    .first()
    .contains(2);

  });
  
  it('drags 2 buns in one go', function() {
    const ingredientIndex = BUN_INDEX;
    const targetArea = '[class^=burger-constructor_constructor]';

    dropIngredientIntoTarget(ingredientIndex, targetArea);
    checkDragIsCorrect(ingredientIndex, 2);
  });

  it('fails to drop outside drop area', function() {
    const ingredientIndex = FILLING_INDEX;
    const targetArea = '[class^=app-header_header]';

    cy.get('[class^=ingredient_card]').eq(ingredientIndex).as('draggableElement');

    cy.get('@draggableElement')    
    .find('[class^=counter_counter__num]')
    .invoke('text')
    .then((oldCount) => {
      dropIngredientIntoTarget(ingredientIndex, targetArea);
  
      cy.get('@draggableElement')    
      .find('[class^=counter_counter__num]')
      .contains(oldCount);
    });

  });

  }); 