// Título del caso de pruebas
describe ('Inventario Sauce Demo', () => {

    // Que por cada "it" se ejecute automáticamente el usuario de Sauce Demo para acceder al inventario
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/') 

        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave correcta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
    })

    it('Verificar cantidad de productos en inventario', () =>{
      cy.get('[data-test="inventory-item-name"]').should('have.length' , 6)
    })

    it('Ordenar productos por precio (menor a mayor)', () =>{
    cy.get('[data-test="product-sort-container"]').select('lohi') //Elijo Lohi porque es el value de menor a mayor
    cy.get('[data-test="product-sort-container"]').should('have.value', 'lohi') // Corroboramos que haya quedado seleccionado

    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Onesie') //Me fijo si el primer producto que aparece es el Sauce Labs Onesie
    cy.get('.inventory_item_price').first().should('have.text', '$7.99')//Validamos que sea del precio que corresponde
  })
})