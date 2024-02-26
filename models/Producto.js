import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import types from "mongoose"

const ProductoSchema = new mongoose.Schema({
    Codigo: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripcion: { type: String, required: true },
    UnidadMedida: { type: String, required: true},
    PrecioUnitario: { type: Number, required: true},
    Iva: {type: Number, required: true},
    Consumible: { type: Boolean, required: true},
    /* ImagenUrl: { type: String }, */
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
    Lote_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lote",
        required: true,
    },
})

export default mongoose.model("Producto", ProductoSchema)