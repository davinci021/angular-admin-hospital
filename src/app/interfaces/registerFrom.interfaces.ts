import { Usuario } from "../models/usuario.model";

export interface RegisterForm {
    nombre: string,
    email: string,
    password: string,
    password2: string,
    terminos: boolean
}
export interface LoginForm {
    email: string,
    password: string,
}

export interface ActualizarUserForm {
    nombre: string,
    email: string,
    role : string
}

export interface CargarUsuarios {
    total: number; 
    usuario: Usuario[]
}


