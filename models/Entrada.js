import mongoose from "mongoose";

const entradaSchema = new mongoose.Schema({
    Cantidad:{ type:Number, require:true},
    Producto_id:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
    Total: {type: Number},
    Estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
})

export default mongoose.model("Entrada", entradaSchema)