// Título del caso de pruebas
describe ('Login Sauce Demo', () => {

    // Que por cada "it" se ejecute automáticamente el home de Sauce Demo
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login exitoso', () =>{
        // cy.log('--- Login exitoso con usuario estándar ---') Título para ver en la consola de cypress
        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave correcta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
        cy.get('.app_logo').should('have.text', 'Swag Labs') //Corroboramos si el logo está con su nombre
    })

    it('Login con contraseña incorrecta', () =>{
        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('12345') //Tipeamos la clave incorrecta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.get('[data-test="error"]').should('be.visible') //Validamos que el error esté visible
        .and('contain','Epic sadface: Username and password do not match any user in this service') //Validamos que contenga el cartel de alerta correspondiente
    })

    it('Login con campos vacíos', () =>{
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.get('[data-test="error"]').should('be.visible') //Validamos que el error esté visible
        .and('contain','Epic sadface: Username is required') //Validamos que contenga el cartel de alerta correspondiente
    })

    it('Login con usuario bloqueado (locked_out_user)', () =>{
        cy.get('[data-test="username"]').type('locked_out_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave incorrecta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.get('[data-test="error"]').should('be.visible') //Validamos que el error esté visible
        .and('contain','Epic sadface: Sorry, this user has been locked out.') //Validamos que contenga el cartel de alerta correspondiente
    })

    it('Logout desde el menú hamburguesa', () =>{
        cy.get('[data-test="username"]').type('standard_user') //Tipeamos el usuario correcto
        cy.get('[data-test="password"]').type('secret_sauce') //Tipeamos la clave correcta
        cy.get('[data-test="login-button"]').click() //Damos en el botón 'click'

        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
        cy.get('[react-burger-menu-btn"]').click()
        .and('select' , '[data-test="logout-sidebar-link"]')

//        cy.url().should('include' , '/inventory.html') //Corroboramos que entremos al inventario
//        cy.get('.app_logo').should('have.text', 'Swag Labs') //Corroboramos si el logo está con su nombre
    })
    
})
