import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import Area from "./routes/Dependecia.js"
import DetallePedido from "./routes/DetallePedido.js";
import DistribucionLoteFicha from "./routes/DistribucionLoteFicha.js";
import DistribucionPresupuesto from "./routes/DistribucionPresupuesto.js";
import Ficha from "./routes/Ficha.js";
import ItemPresupuesto from "./routes/ItemPresupuesto.js";
import Lote from "./routes/Lote.js";
import Pedido from "./routes/Pedido.js";
import Producto from "./routes/Producto.js";
import Usuarios from "./routes/Usuarios.js";
import cors from "cors"

const index = express()
index.use(cors());
index.use(express.json())

index.use("/api/area", Area)
index.use("/api/detallepedido", DetallePedido)
index.use("/api/disloteficha", DistribucionLoteFicha)
index.use("/api/dispresupuesto", DistribucionPresupuesto)
index.use("/api/ficha", Ficha)
index.use("/api/itempresu", ItemPresupuesto)
index.use("/api/lote", Lote)
index.use("/api/pedido", Pedido)
index.use("/api/producto", Producto)
index.use("/api/usuario", Usuarios)


index.listen(process.env.PORT, () => {
    console.log(
        `Servidor escuchando en el puerto ${process.env.PORT}`
    );
    mongoose.connect(process.env.DB)
        .then(() => console.log(`!Conexion Activa¡`));
})