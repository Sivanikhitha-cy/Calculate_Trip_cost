class HotelSearch {
    visit(){
        cy.visit('https://www.ixigo.com/hotels', {
            onBeforeLoad(win) {
                win.localStorage.clear();
                },
            cache: false
            });
        cy.get('[data-testid="bpg-home-modal-close"]', { timeout: 10000 }).should('be.visible').click({ force: true });
        }
        
    closeAdPopup() {
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="bpg-home-modal-close"]').length > 0) {
                cy.get('[data-testid="bpg-home-modal-close"]').click({ force: true });
                }
            });
        }
  
    enterCity(city) {
        cy.get('input[placeholder="Enter city, area or property name"]', { timeout: 10000 }).should('be.visible').clear().type(city).type('{enter}')
        cy.wait(500)
        cy.get('[data-testid="Manali"]').click()
        cy.wait(500)
        }

    selectCheckIn(date) {
        cy.get('[data-testid="checkin-input"]', { timeout: 10000 }).should('be.visible').click();
        cy.wait(5000)
        cy.get(`[aria-label="${date}"]`).click({force:true});
        cy.wait(500)
        }

    selectCheckOut(date) {
        cy.get(`[aria-label="${date}"]`).click({force:true});
        cy.wait(500)
        }

}


export default new HotelSearch;