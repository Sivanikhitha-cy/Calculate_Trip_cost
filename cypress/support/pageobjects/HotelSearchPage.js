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
        selectGuests() {
        cy.get('input[placeholder="Rooms & Guests"]').click({force:true})
        for (let i = 0; i < 5; i++) {
            cy.get('[data-testid="room-decrement"]').click({ force: true });
            cy.get('[data-testid="adult-decrement"]').click({ force: true });
            cy.wait(100);
            }
 
        for (let i = 1; i < 3; i++) {
            cy.get('[data-testid="room-increment"]').click({ force: true });
            cy.wait(100);
            }
 
        for (let i = 1; i < 4; i++) {
            cy.get('[data-testid="adult-increment"]').click({ force: true });
            cy.wait(100);
            }}
   
    search() {
        cy.get('[data-testid="search-hotels"]').click({force:true})
        cy.wait(5000);
        }
   
    sort() {    
    //Verify highest user rating can be selected from Popularity dropdown. (Nikhitha)
        cy.get('.border-neutral-100 > div > .body-md').click({force:true})
        cy.wait(5000)
        }
     
    elevatorAccess() {  
    //Confirm elevator filter shows only accessible properties
        cy.get('input[value="SC_UR"]').click({force:true})
        cy.contains('Facilities').scrollIntoView()
        //cy.contains('View More').first().click()
        cy.get(':nth-child(6) > .mx-20').click()
        cy.wait(5000)
        cy.get('input[value="FL_HF_7"]').click({force:true})
        }
        
    hotelDetails(){    
        cy.get('[data-testid="hotel-name"]').first().then((hotel)=>{
            let HotelName=hotel.text()
            cy.log(`Hotel Name : ${HotelName}`)
            })
        cy.get('.h5.text-right.text-primary.font-medium', { force: true }).first().then(($price) => {
            const Price = $price.text().trim();
            cy.log(`Price: ${Price}`);
            });
 
        cy.get("[data-testid='hotel-list']").find('a').first().invoke("removeAttr","target").click()
        cy.wait(4000)
        cy.get(".items-baseline.inline").find('.text-primary').first().then((el)=>{
            const priceText =el.text().trim();
            cy.log(`Per Night Price for 3 rooms: ${priceText}`)
            const perNightPrice = parseInt(priceText.replace(/[^\d]/g, ''));
            const numberOfNights = 5;
            const totalPrice = perNightPrice * numberOfNights;
            cy.log(`Total Price for ${numberOfNights} nights (3 rooms): ₹${totalPrice}`);
            });
        }
 

}


export default new HotelSearch;