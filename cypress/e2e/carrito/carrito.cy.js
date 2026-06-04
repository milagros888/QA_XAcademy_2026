describe ('Carrito Sauce Demo', () => {

    // Que por cada "it" se ejecute automáticamente el usuario de Sauce Demo para acceder al inventario
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/') 

        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave correcta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
    })

    it('Agregar un producto al carrito)', () =>{
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click() //Agregamos el producto que nos pedía el excel

      cy.get('.shopping_cart_badge').should('have.text', '1') //chequeamos que el carrito si tenga 1 item

      cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove') //chequeamos que ahora el add to cart sea un remove
  })

    it('Agregar múltiples productos y verificar contador', () =>{
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click() //Agregamos los productos al carrito que nos pedía el excel
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()

      cy.get('.shopping_cart_badge').should('have.text', '3') //chequeamos que el carrito si tenga 3 items

      cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove') //chequeamos que ahora el add to cart sea un remove
      cy.get('[data-test="remove-sauce-labs-bike-light"]').should('have.text', 'Remove')
      cy.get('[data-test="remove-sauce-labs-onesie"]').should('have.text', 'Remove')
    })



    it('Eliminar un producto desde la página del carrito)', () =>{
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

      cy.get('.shopping_cart_badge').should('have.text', '2') //chequeamos que el carrito si tenga 2 items

      cy.get('[data-test="shopping-cart-link"]').click() //abrimos el icono del carrito

      cy.get('[data-test="remove-sauce-labs-backpack"]').click() //Removemos el primer producto del carrito

      cy.get('.shopping_cart_badge').should('have.text', '1') //chequeamos que el carrito ahora si haya eliminado el item

  })
})