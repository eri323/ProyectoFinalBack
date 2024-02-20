import Usuario from "../models/Usuarios.js";

const helpersUsuario = {
    existeHolderById: async (id, req) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.UsuarioUpdate = existe
    },
    existeCorreo: async (correo, req) => {
        const existe = await Usuario.findOne({correo})

        if (!existe) {
            throw new Error(`El correo no existe`)
        }

        req.req.UsuarioUpdate = existe
    },
    validarPassword: async (password, req) => {
        const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!vali.test(password)) {
            throw new Error("La contraseña no cumple con los requisitos, debe contener una letra mayuscula, una minuscula, un carcater especial y contener minimo 8 caracteres.");
        }
        return true;
    },
    validarRol: async (rol, req) => {
        const roles = ["admin", "instructor", "bodega"]
        if (!roles.includes(rol.toLowerCase())) {
            throw new Error("Rol no válido")
        }
    }
}


export default helpersUsuario