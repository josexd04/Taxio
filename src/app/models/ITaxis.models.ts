export interface ITaxi {
    taxiNumber: number;
    driverID: string ;
    arrivalFolio:string;
    folio?: number;
    arrivalTime?: string;
    leftTime?: string;
    position?: string| undefined;
    status?: boolean;
    _id?: string | number;
    queue?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  