import { Modulo } from "./Modulo";

export class Submodulo {
    idsubmodulos!: string;
    descricao!: string;
    path!: string;
    status!: Number;
    modulo!: Modulo;
    constructor(idsubmodulos?: string, descricao?: string, path?: string, status?: Number, modulo?: Modulo) {
        if (idsubmodulos !== undefined) {
            this.idsubmodulos = idsubmodulos;
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

        if (modulo !== undefined) {
            this.modulo = modulo;
        }
    }
}