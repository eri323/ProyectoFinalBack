import mongoose from "mongoose";
const DistribucionLoteFichaSchema = new mongoose.Schema({
    Presupuesto: { type: Number, required: true },
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
    DistribucionPresupuesto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DistribucionPresupuesto', required: true },
    Ficha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ficha', required: true }
})
export default mongoose.model("DistribucionLoteFicha", DistribucionLoteFichaSchema )