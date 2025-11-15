export interface Servicio{
    id:number;
    idUsuario:number;
    idVehiculo:number;
    idServicio:number;
    idEmpleado:number;
    idTarifa:number;
    idEspacio:number;
    fechaHoraEntrada:Date;
    fechaHoraSalida:Date;
    valor:bigint;
    estado:number;
}