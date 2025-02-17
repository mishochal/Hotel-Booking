export interface BookedRoom extends BookingForm {
    id: number;
    totalPrice: number;
    isConfirmed: boolean;
}

export interface BookingForm {
    roomID: number;
    checkInDate: string;
    checkOutDate: string;
    customerName: string;
    customerId: string;
    customerPhone: string;
}