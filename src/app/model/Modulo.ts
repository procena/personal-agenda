
export class Modulo {
    idmodulo!: string;
    descricao!: string;
    path!: string;
    status!: Number;

    /**
     *
     */
    constructor(idmodulo?: string, descricao?: string, path?: string, status?: Number) {

        if (idmodulo !== undefined) {
            this.idmodulo = idmodulo;

        }

        if (descricao !== undefined) {
            this.descricao = descricao;
        }

        if (path !== undefined) {
            this.path = path;
        }

        if (status !== undefined) {
            this.status = status;
        }
    }
}