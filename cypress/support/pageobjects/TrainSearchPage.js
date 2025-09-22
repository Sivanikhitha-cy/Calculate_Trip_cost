class TrainSearch {
    //Confirm train booking website is accessible.
    visitTrainPage() {
        cy.visit('https://www.ixigo.com/trains');
        }
    //Verify departure and arrival cities input shows train options.
    enterOrigin(city) {
        cy.wait(5000)
        cy.get('input[placeholder="Enter Origin"]').click({force:true}).type(city);
        cy.wait(5000);
        cy.get('.z-20 .w-full').children().eq(2).click();
        }
 
    enterDestination(city) {
        cy.get('input[placeholder="Enter Destination"]').type(city);
        cy.wait(5000);
        cy.get('.z-20 .w-full').children().eq(1).click();
        }
 
    
    }
 
export default new TrainSearch();