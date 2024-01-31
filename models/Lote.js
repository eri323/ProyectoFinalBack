import mongoose from "mongoose";
const LoteSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    Presupuesto: { type: Number, required: true},
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
})

export default mongoose.model("Lote", LoteSchema)