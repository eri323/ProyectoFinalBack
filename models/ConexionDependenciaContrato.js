import mongoose from "mongoose";

const conexionDependenciaContratoSchema = new mongoose.Schema({
    DistribucionDependencia_id:{type:mongoose.Schema.Types.ObjectId,ref:'DistribucionDependencia', require:true},
    Contrato_id:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});

export default mongoose.model("ConexionDependenciaContrato", conexionDependenciaContratoSchema)
