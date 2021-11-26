
export class Perfil {
    idperfil!: string;
    descricao!: string;
    status!: Number;
    constructor(idperfil?: string, descricao?: string, status?: Number) {
        this.idperfil = idperfil !== undefined ? idperfil : '';
        this.descricao = descricao !== undefined ? descricao : '';
        this.status = status !== undefined ? status : -1;
        
    }
}