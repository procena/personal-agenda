export class Marcacao {
    id!: number;
    evento!: string;
    data!: string;
    hora!: string;
    estado!: string;


    constructor (id?:number,evento?:string, data?:string, hora?:string,estado?:string) {
        if(id !== undefined)
            this.id = id;
        if(evento !== undefined)
            this.evento = evento;
        if(data !== undefined)
            this.data = data;
        if(hora !== undefined)
            this.hora = hora;
        if(estado !== undefined)
            this.estado = estado;

    }
}
