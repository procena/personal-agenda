import { Modulo } from "./Modulo";
import { Perfil } from "./Perfil";
import { Permissao } from "./Permissao";

export class Acesso {
    id!: Number;
    permissaoAcess!: Permissao;
    perfilAcess!: Perfil;
    moduloAcess!: Modulo;
    status!: Number;
    constructor(id?: Number, permissaoAcess?: Permissao, perfilAcess?: Perfil, moduloAcess?: Modulo, status?: Number) {
        if (id !== undefined) {
            this.id = id;
        }
        if (permissaoAcess !== undefined) {
            this.permissaoAcess = permissaoAcess;
        }

        if (perfilAcess !== undefined) {
            this.perfilAcess =  perfilAcess;
        }

        if (moduloAcess !== undefined) {
            this.moduloAcess = moduloAcess;
        }

        if (status !== undefined) {
            this.status =  status;
        }
        
        
        



    }
}