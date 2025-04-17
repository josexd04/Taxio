export interface IDriver {
    name: string;
    driverID: string;
    license: string;
    phone: number;
    taxiNumber: number; 
    status?: boolean;
    activeTime?: string | Date;
    lastConnection?: string | Date;
    _id?: string | number;
    createdAt?: Date;
    updatedAt?: Date;

}