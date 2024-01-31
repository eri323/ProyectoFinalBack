import Productos from "../models/Producto.js";

const httpProductos = {
    getProductos: async (req, res) => {
        try {
            const productos = await Productos.find();
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    getProductosId: async (req, res) => {
        const { id } = req.params;
        try {
            const productos = await Productos.findById(id);
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postProductos: async (req, res) => {
        try {
            const { Codigo, Nombre, Descripcion, UnidadMedida, PrecioUnitario, Iva, Tipo } = req.body;
            const productos = new Productos({ Codigo, Nombre, Descripcion, UnidadMedida, PrecioUnitario, Iva, Tipo });
            productos.save();
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error });
        }

    },

    putProductos: async (req, res) => {
        try {
            const { id } = req.params;
            const {Codigo, Nombre, Descripcion, UnidadMedida, PrecioUnitario, Iva, Tipo  } = req.body;
            const productos = await Productos.findByIdAndUpdate(id, {Codigo, Nombre, Descripcion, UnidadMedida, PrecioUnitario, Iva, Tipo  }, { new: true });
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error: "Error en el servidor" });
        }
    },


    putProductosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const productos = await Productos.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putProductosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const productos = await Productos.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpProductos;
