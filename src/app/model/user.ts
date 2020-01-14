export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    roles:{
        roleId: number,
        roleNames: string
    }
}