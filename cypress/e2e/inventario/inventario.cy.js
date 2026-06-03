// Verificar que la carga de datos sea correcta

describe("Validamos links",() => {
  it("Visitar la pagina", () => {
    cy.visit("https://cypress-playground.vercel.app/forms");
    cy.get('[data-testid="bp-name"]').type('Milagros')
    cy.get('[data-testid="bp-email"]').type('email@random.com')
  });
});