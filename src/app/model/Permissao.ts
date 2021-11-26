
export class Permissao {
    id!:Number;
    edit!:Number;
    remover!:Number;
    consult!:Number;
    inserir!:Number;
    constructor(id?:Number,edit?:Number,remover?:Number,consult?:Number,inserir?:Number) {
        this.id = id !== undefined ? id : -1;
        this.edit = edit !== undefined ? edit : -1;
        this.remover = remover !== undefined ? remover : -1;
        this.consult = consult !== undefined ? consult : -1;
        this.inserir = inserir !== undefined ? inserir : -1;
        
    }
}