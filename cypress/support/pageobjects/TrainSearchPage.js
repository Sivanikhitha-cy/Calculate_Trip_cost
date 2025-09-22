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

    selectDate(index = 30) {
        cy.get('.react-calendar__month-view__days').find('button').eq(index).click();
        }
 
    //Validate sorting options are visible and loggable
    clickBookTickets() {
        cy.get('button[data-testid="book-train-tickets"]').click({ force: true });
        cy.wait(10000);
        }
 
    //Confirm train details (name, classes, service days) are viewable.
    selectTrainCheckbox() {
        cy.get('[data-checkboxindex="0"] .ixi-icon-tick').eq(1).click({ force: true });
        }
 
    getSortOptions() {
        let sortOptions=[];
        cy.get('.nav-list-item.u-ib.u-uppercase[data="0"], .nav-list-item.u-ib.u-uppercase[data="1"], .nav-list-item.u-ib.u-uppercase[data="2"], .nav-list-item.u-ib.u-uppercase[data="3"]').each(($el, index) => {
            sortOptions.push($el.text().trim());
            }).then(() => {
                cy.log('Array Name: sortOptions');
                sortOptions.forEach((option, i) => {
                    cy.log(`sortOptions[${i}]: ${option}`);
                    console.log(`sortOptions[${i}]: ${option}`);
                    });
                });
        }
 
    clickFirstTrain() {
        cy.get('.name-number').first().click();
        }
 
    getTrainName() {
        cy.get('.name').then(($name) => {
            cy.log('Train Name:', $name.text().trim());
            });
        }
 
    getAvailabilityDetails() {
        cy.get('.data-section[data-target="availability"]').last().scrollIntoView().find('.train-detail-table-row').then(($rows) => {
            let classes = '';
            let serviceDays = '';
 
            $rows.each((_, row) => {
                const label = Cypress.$(row).find('.train-detail-table-l-data').text().trim();
                const value = Cypress.$(row).find('.train-detail-table-r-data').text().trim();
 
                if (label === 'Classes') classes = value;
                if (label === 'Service Days') serviceDays = value;
                });
 
            cy.log('Train Classes:', classes);
            cy.log('Service Days:', serviceDays);
            });
        }
 
    
    }
 
export default new TrainSearch();