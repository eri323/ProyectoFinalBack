import mongoose from "mongoose";

const salidaSchema = new mongoose.Schema({
    Numero: {type: Number, unique: true},
    FechaEntrega: {type:Date, require:true },
    Bodeguero_id: {type:mongoose.Schema.Types.ObjectId,ref:'Usuarios', require:true},
    Pedido_id: {type:mongoose.Schema.Types.ObjectId,ref:'Pedido', require:true},
    Total: {type:Number},
    Entregado: {type:Boolean, default: 0},
    Estado:{type:Boolean, default:0},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Salida", salidaSchema)