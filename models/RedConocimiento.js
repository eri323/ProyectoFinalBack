import mongoose from "mongoose";

const redConocimientoSchema = new mongoose.Schema({
    Nombre : { type: String, index:'text', require:true, unique:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});

export default mongoose.model("RedConocimiento", redConocimientoSchema)