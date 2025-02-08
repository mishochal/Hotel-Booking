export interface BookedRoom {
    id: number;
    roomID: number;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    isConfirmed: boolean;
    customerName: string;
    custmerId: string;
    customerPhone: string;
}