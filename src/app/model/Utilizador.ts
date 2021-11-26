export class Utilizador {
    username!: string;
    password!: string;
    firstname!: String;
    lastname!: String;
    created_at!: Date;
    deleted_at!: Date;
    updated_at!: Date;
    status!: Number;
    profile!: String;
    token!: String;

    constructor(username?: string, password?: string, firstname?: String, lastname?: String, created_at?: Date, deleted_at?: Date, updated_at?: Date, status?: Number, profile?: String, token?: String) {
        if (username !== undefined) {
            this.username = username;
        }

        if (password !== undefined) {
            this.password = password;
        }

        if (firstname !== undefined) {
            this.firstname = firstname;
        }

        if (lastname !== undefined) {
            this.lastname = lastname;
        }

        if (created_at !== undefined) {
            this.created_at = created_at;
        }

        if (deleted_at !== undefined) {
            this.deleted_at = deleted_at;
        }

        if (updated_at !== undefined) {
            this.updated_at = updated_at;
        }

        if (status !== undefined) {
            this.status = status;
        }

        if (profile !== undefined) {
            this.profile = profile;
        }

        if (token !== undefined) {
            this.token = token;
        }

    }
}