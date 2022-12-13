describe("Login suite", () => {
  beforeEach(() => {
    cy.exec("npm run");
  });

  it("Login test", () => {
    //Arrange
    cy.visit("/");
    //Act
    cy.get('#login_email').type("juice.leskinen@manse.com");
    cy.get('#login_pw').type("olenjumala");
    cy.get('#login_btn').click();
    cy.get('select').select('Jouluisa kinkkutentti')
    //Assert
    cy.contains('Jouluisa kinkkutentti').should('be.visible')
  });

  /* afterEach(() => {
    cy.get('#poistu').click()
  }) */
});
