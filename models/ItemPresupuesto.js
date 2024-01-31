import mongoose from "mongoose";

const ItemPresupuestoSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    Presupuesto: { type: Number, required: true},
    createAT: { type: Date, default: Date.now },
})

export default mongoose.model("ItemPresupuesto", ItemPresupuestoSchema )