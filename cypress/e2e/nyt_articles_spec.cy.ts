/// <reference types="cypress" />

describe('NYT Most Popular Articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', { fixture: 'nyt_articles.json' }).as('getArticles');
    cy.visit('http://localhost:3000');
    cy.wait('@getArticles');
  });

  it('displays the header correctly', () => {
    cy.contains('NYT Most Popular').should('be.visible');
    cy.contains('Find the most popular articles on New York Times').should('be.visible');
  });

  it('displays a list of articles', () => {
    cy.get('[data-testid="article-list"]').should('exist');
    cy.get('[data-testid="article-item"]').should('have.length', 1);
  });

  it('displays article details when an article is selected', () => {
    cy.get('[data-testid="article-item"]').first().click();

    cy.get('[data-testid="article-details"]').within(() => {
      cy.get('[data-testid="article-title"]').should('be.visible');
      cy.get('[role="img"]').should('be.visible');
      cy.contains('Read more.').should('be.visible');
    });
  });

  it('deselects an article when clicked again', () => {
    cy.get('[data-testid="article-item"]').first().click();

    cy.get('[data-testid="article-details"]').within(() => {
      cy.get('[data-testid="article-title"]').should('be.visible');
    });

    cy.get('[data-testid="article-item"]').first().click();

    cy.contains('Please select an article to view its details').should('be.visible');
  });

  it('opens the full article in a new tab when "Read more" is clicked', () => {
    cy.get('[data-testid="article-item"]').first().click();

    cy.get('[data-testid="article-details"]').within(() => {
      cy.contains('Read more.')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noreferrer')
        .should('have.attr', 'href')
        .and('include', 'https://');
    });
  });

  it('shows loading state while fetching articles', () => {
    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', (req) => {
      req.reply((res) => {
        res.delay = 1000
        res.send({ fixture: 'nyt_articles.json' })
      });
    }).as('getArticlesDelayed');
    
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="loading"]').should('be.visible');
    cy.wait('@getArticlesDelayed');
    cy.get('[data-testid="loaded"]').should('be.visible');
  });
});
