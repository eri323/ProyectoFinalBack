import Usuarios from "../models/Usuarios.js";
import { generarJWT } from "../middelwares/validar-jwt.js";
import bcryptjs from "bcrypt"
import nodemailer from "nodemailer"


let codigoEnviado = {};

function generarNumeroAleatorio() {
  let numeroAleatorio = Math.floor(Math.random() * 1000000);
  let numero = numeroAleatorio.toString().padStart(6, "0");
  let fechaCreacion = new Date();

  codigoEnviado = { codigo: numero, fechaCreacion };

  return numero;
}
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

    recuperarPassword: async (req, res) => {
    try {
      const { Correo } = req.body;

      const usuario = await Usuarios.findOne({ Correo });

      if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });
   

      
      const  codigo = generarNumeroAleatorio()
      const mailOptions = {
        from: process.env.userEmail,
        to: Correo,
        subject: "Recuperación de Contraseña",
        text:
          "Su codigo es este: " + codigo, 
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            msg: "Error al enviar el Correo electrónico.",
          });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({
            success: true,
            msg: "Correo electrónico enviado con éxito.",
          });
        }
      });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error });
    }
  },

  confirmarCodigo: async (req, res) => {
    try {
      const { codigo } = req.params;

      if (!codigoEnviado) {
        return res.status(400).json({ error: "Código no generado" });
      }

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo === codigoGuardado) {
        return res.json({ msg: "Código correcto" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
    }
  },



nuevaPassword: async (req, res) => {
    try {
      const { Correo, codigo, Contraseña } = req.body;

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo === codigoGuardado) {
        codigoEnviado = {};

        const usuario = Usuarios.findOne({Correo});

        const salt = bcryptjs.genSaltSync();
        const newPassword = bcryptjs.hashSync(Contraseña, salt);

        await Usuarios.findByIdAndUpdate(
          usuario._id,
          { Contraseña: newPassword },
          { new: true }
        );

        return res
          .status(200)
          .json({ msg: "Contraseña actualizada con éxito" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
    }
  },



};

export default httpUsuarios;
