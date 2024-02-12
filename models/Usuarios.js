import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    Identificacion: { type: Number, required: true},
    Telefono: { type: Number, required: true},
    Correo: { type: String, required: true},
    Contraseña: { type: String, required: true},
    Rol: { type: String, required: true},
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
    Imagen: {Buffer, contentType: String, nombre: imagen},
})



export default mongoose.model("Usuarios", UsuarioSchema)