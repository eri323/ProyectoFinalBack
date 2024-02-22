import Usuario from "../models/Usuarios.js";

const helpersUsuario = {
    existeHolderById: async (id, req) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.UsuarioUpdate = existe
    },
    CorreoExistente2: async (Correo, req) => {
        const existe = await Usuario.findOne({Correo})

        if (!existe) {
            throw new Error(`El correo no existe`)
        }

        req.req.UsuarioUpdate = existe
    },
    IdentificacionExistente: async (Identificacion, req) => {
        const existe = await Usuario.findOne({
            $text: { $search: Identificacion },
        });

        if (existe) {
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
                throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
            } else if (req.req.method === "POST") {
                throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
            }
        }

        req.req.UsuarioUpdate = existe;
    },

    TelefonoExistente: async (Telefono, req) => {
        const existe = await Usuario.findOne({ $text: { $search: Telefono } });

        if (existe) {
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
                throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
            } else if (req.req.method === "POST") {
                throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
            }
        }

        req.req.UsuarioUpdate = existe;
    },

    CorreoExistente: async (Correo, req) => {
        const existe = await Usuario.findOne({ Correo });

        if (!existe && req.req.method === "GET") {
            throw new Error(`El correo no se encuentra registrado`);
        }

        if (existe) {
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
                throw new Error(`Ya existe ese correo en la base de datos!!! `);
            } else if (req.req.method === "POST") {
                throw new Error(`Ya existe ese correo en la base de datos!!! `);
            }
        }

        req.req.UsuarioUpdate = existe;
    },
    validarPassword: async (password, req) => {
    const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!*/_-.:,;{}]).{8,}$/;
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