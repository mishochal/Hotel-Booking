import { Room } from "./rooms.model";

export interface Hotel {
    id: number;
    name: string;
    address: string;
    city: string;
    featuredImage: string;
    rooms: Room[];
}