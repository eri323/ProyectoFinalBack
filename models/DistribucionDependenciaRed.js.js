import mongoose from "mongoose";
const DistribucionDependenciaRedSchema = new mongoose.Schema({
  PresupuestoAsignado: { type: Number, require: true },
  PresupuestoDisponible: { type: Number, require: true },
  Dependencia_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dependencia",
    require: true,
  },
  Red_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RedConocimiento",
    require: true,
  },
  Año: { type: Date, require: true },
  createAT: { type: Date, default: Date.now },
  Estado: { type: Boolean, default: 1 },
});
export default mongoose.model(
  "DistribucionDependenciaRed",
  DistribucionDependenciaRedSchema
);
