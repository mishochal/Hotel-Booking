export interface RoomsFilter {
    roomTypeId?: number;
    priceFrom?: number;
    priceTo?: number;
    maximumGuests?: number;
    checkIn?: string;
    checkOut?: string;
}