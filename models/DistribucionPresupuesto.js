import mongoose from "mongoose";
const DistribucionPresupuestoSchema = new mongoose.Schema({
    Presupuesto: { type: Number, required: true },
    presupuestoDisponible: { type:Number, require:true},
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
    Lote_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lote', required: true },
    ItemPresupuesto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemPresupuesto', required: true }
})
export default mongoose.model("DistribucionPresupuesto", DistribucionPresupuestoSchema)