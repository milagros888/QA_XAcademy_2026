describe ('Checkout Sauce Demo', () => {

    // Que por cada "it" se ejecute automáticamente el usuario de Sauce Demo para acceder al inventario
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/') 

        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave correcta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
    })

    it('Completar checkout con datos válidos)', () =>{
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click() //agregamos un producto al carrito
      cy.get('[data-test="shopping-cart-link"]').click() //abrimos el icono del carrito
      cy.get('[data-test="checkout"]').click() //seleccionamos el checkout
    
      cy.get('[data-test="firstName"]').type('Juan') //Completamos los datos del excel
      cy.get('[data-test="lastName"]').type('Pérez')
      cy.get('[data-test="postalCode"]').type('5000')
      cy.get('[data-test="continue"]').click() //damos al botón continue
      cy.get('[data-test="finish"]').click() //damos al botón Finish

      cy.get('[data-test="complete-header"]').should('be.visible') //Validamos que la confirmación esté visible
        .and('contain','Thank you for your order!') //Validamos que contenga el cartel correspondiente
  })

      it('Checkout sin completar campos obligatorios)', () =>{
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click() //agregamos un producto al carrito
      cy.get('[data-test="shopping-cart-link"]').click() //abrimos el icono del carrito
      cy.get('[data-test="checkout"]').click() //seleccionamos el checkout
    
      cy.get('[data-test="continue"]').click() //damos al botón continue

      cy.get('[data-test="error"]').should('be.visible') //Validamos que la confirmación esté visible
        .and('contain','Error: First Name is required') //Validamos que contenga el cartel correspondiente
  })
})