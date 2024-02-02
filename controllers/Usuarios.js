import Usuarios from "../models/Usuarios.js";
import { generarJWT } from "../middelwares/validar-jwt.js";
import bcryptjs from "bcrypt"

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuarios.find();
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    getUsuariosId: async (req, res) => {
        const { id } = req.params;
        try {
            const usuarios = await Usuarios.findById(id);
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postUsuarios: async (req, res) => {
        try {
            const { Nombre, Identificacion, Telefono, Correo, Contraseña, Rol } = req.body;
            const usuarios = new Usuarios({ Nombre, Identificacion, Telefono, Correo, Contraseña, Rol });

            const salt = bcryptjs.genSaltSync();
            usuarios.Contraseña = bcryptjs.hashSync(Contraseña, salt)

            usuarios.save();
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error });
        }

    },

    putUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { Nombre, Identificacion, Telefono, Correo, Contraseña, Rol } = req.body;
            const usuarios = await Usuarios.findByIdAndUpdate(id, { Nombre, Identificacion, Telefono, Correo, Contraseña, Rol }, { new: true });
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error: "Error en el servidor" });
        }
    },


    putUsuariosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarios = await Usuarios.findByIdAndUpdate(id, { Estado: 0 }, { new: true });
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putUsuariosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarios = await Usuarios.findByIdAndUpdate(id, { Estado: 1 }, { new: true });
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    login: async (req, res) => {
        const { Identificacion, Contraseña } = req.body;

        try {
            const usuarios = await Usuarios.findOne({ Identificacion })
            if (!usuarios) {
                return res.status(400).json({
                    msg: "usuario / Contraseña no son correctos"
                })
            }

            if (usuarios.Estado === 0) {
                return res.status(400).json({
                    msg: "usuario Inactivo"
                })
            }

            const validContraseña = bcryptjs.compareSync(Contraseña, usuarios.Contraseña);
            if (!validContraseña) {
                return res.status(401).json({
                    msg: "usuario / Contraseña no son correctos"
                })
            }

            const token = await generarJWT(usuarios.id);

            res.json({
                usuarios,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

};

export default httpUsuarios;
