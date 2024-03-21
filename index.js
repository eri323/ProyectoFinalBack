import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import Area from "./routes/Area.js"
import DetallePedido from "./routes/DetallePedido.js";
import Lote from "./routes/Lote.js";
import Pedido from "./routes/Pedido.js";
import Producto from "./routes/Producto.js";
import Dependencia from "./routes/Dependencias.js";
import Destino from "./routes/Destino.js";
import DetalleSalida from "./routes/DetalleSalida.js";
import DistribucionAreaDestino from "./routes/DistribucionAreaDestino.js";
import DistribucionContratoLote from "./routes/DistribucionContratoLote.js";
import DistribucionDependencia from "./routes/DistribucionDependencia.js";
import DistribucionDependenciaRed from "./routes/DistribucionDependenciaRed.js";
import DistribucionRedArea from "./routes/DistribucionRedArea.js";
import Entrada from "./routes/Entrada.js";
import RedConocimiento from "./routes/RedConocimiento.js";
import Salida from "./routes/Salida.js";
import Usuarios from "./routes/Usuarios.js";
import Contrato from "./routes/Contrato.js";
import cors from "cors"
import { deserialize } from "mongodb";

const index = express()
index.use(cors());
index.use(express.json())

index.use("/api/area", Area)
index.use("/api/detallepedido", DetallePedido)
index.use("/api/lote", Lote)
index.use("/api/pedido", Pedido)
index.use("/api/producto", Producto)
index.use("/api/usuario", Usuarios)
index.use("/api/contrato", Contrato)
index.use("/api/dependecias", Dependencia)
index.use("/api/destino", Destino)
index.use("/api/detallesalida", DetalleSalida)
index.use("/api/disareadestino", DistribucionAreaDestino)
index.use("/api/disconlote", DistribucionContratoLote)
index.use("/api/disdependecia", DistribucionDependencia)
index.use("/api/disdepred", DistribucionDependenciaRed)
index.use("/api/disredarea", DistribucionRedArea)
index.use("/api/entrada", Entrada)
index.use("/api/redconocimiento", RedConocimiento)
index.use("/api/salida", Salida)

index.listen(process.env.PORT, () => {
    console.log(
        `Servidor escuchando en el puerto ${process.env.PORT}`
    );
    mongoose.connect(process.env.DB)
        .then(() => console.log(`!Conexion Activa¡`));
})