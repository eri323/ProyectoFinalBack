import mongoose from "mongoose";

const ConexionRedLoteSchema = new mongoose.Schema({
    Codigo: { type: String, index:"text", require:true, unique:true},
    Lote_id:{type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    Red_id:{type:mongoose.Schema.Types.ObjectId,ref:'RedConocimiento', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("ConexionRedLote", ConexionRedLoteSchema)
