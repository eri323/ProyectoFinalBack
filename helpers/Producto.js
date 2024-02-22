import Producto from "../models/Producto.js";

const helpersProducto = {
    precioValido: async (PrecioUnitario) => {
        if (PrecioUnitario <= 0) {
            throw new Error("Precio no válido");
        }
    },

    existeCodigo: async (Codigo, req) => {
        const existe = await Producto.findOne({ $text: { $search: Codigo } });

        if (existe) {
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
                throw new Error(`Ya existe ese codigo en la base de datos!!! `);
            } else if (req.req.method === "POST") {
                throw new Error(`Ya existe ese codigo en la base de datos!!! `);
            }
        }
        req.req.ProductoUpdate = existe;
    },
};

export default helpersProducto;