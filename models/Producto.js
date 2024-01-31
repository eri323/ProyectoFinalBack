import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    Codigo: { type: Number, required: true },
    Nombre: { type: String, required: true },
    Descripcion: { type: String, required: true },
    UnidadMedida: { type: String, required: true},
    PrecioUnitario: { type: Number, required: true},
    Iva: {type: String, required: true},
    Tipo: { type: String, required: true},
    createAT: { type: Date, default: Date.now },
    Estado: { type: Boolean, default: 1 },
})

export default mongoose.model("Producto", ProductoSchema)