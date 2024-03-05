
import mongoose from "mongoose";

const ItemPresupuestoSchema = new mongoose.Schema({
    Nombre: { type: String, index: "text", require:true, unique: true},
    Presupuesto: { type: Number, required: true},
    presupuestoDisponible: {type:Number, require:true},
    Estado: { type: Number, default: 1 },
    createAT: { type: Date, default: Date.now },
})

export default mongoose.model("ItemPresupuesto", ItemPresupuestoSchema )