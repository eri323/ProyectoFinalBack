import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
    Codigo: { type: String, index:"text", require:true, unique:true},
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: {type:Number, require:true},
    Contrato_id:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    ConexionRedLote_id:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    Año: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    Elementstado:{type:Boolean, default:1}
});

export default mongoose.model("Contrato", contratoSchema)
