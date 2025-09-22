import HotelSearch from '../support/pageobjects/HotelSearchPage';
import TrainSearch from '../support/pageobjects/TrainSearchPage';

describe('Ixigo Hotel and Train Booking', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        console.warn('Uncaught exception:', err.message);
        return false;
        });

    let hotelData;
    let trainData
    beforeEach(() => {
        cy.fixture('HotelSearchData').then((hdata)=>{
            hotelData=hdata
            })
        cy.fixture('TrainSearchData').then((tdata)=>{
            trainData=tdata
            });
        cy.clearCookies();
        cy.clearLocalStorage();
        });

    it('"Verify Holiday Home Search, Guest Selection, and Hotel Details with Price Calculation', () => {
        HotelSearch.visit();
        HotelSearch.closeAdPopup();
        HotelSearch.enterCity(hotelData.city);
        HotelSearch.selectCheckIn(hotelData.checkIn);
        HotelSearch.selectCheckOut(hotelData.checkOut);
        HotelSearch.selectGuests(hotelData.guests);
        HotelSearch.search();
        HotelSearch.sort();
        HotelSearch.elevatorAccess();
        HotelSearch.hotelDetails();
        });
    it('"Verify Train Search and Booking Flow with Availability and Sorting Options', () => {
        TrainSearch.visitTrainPage();
        TrainSearch.enterOrigin(trainData.origin);
        TrainSearch.enterDestination(trainData.destination);
        TrainSearch.selectDate(trainData.dateIndex);
        TrainSearch.clickBookTickets();
        TrainSearch.selectTrainCheckbox();
        TrainSearch.getSortOptions();
        TrainSearch.clickFirstTrain();
        TrainSearch.getTrainName()
        TrainSearch.getAvailabilityDetails()
        });

    
    });

