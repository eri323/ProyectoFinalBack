import Productos from "../models/Producto.js";
import Lote from "../models/Lote.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "tu_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const httpProductos = {
  getProductos: async (req, res) => {
    try {
      const productos = await Productos.find().populate("Lote_Id");
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
      const {
        Codigo,
        Nombre,
        Descripcion,
        UnidadMedida,
        PrecioUnitario,
        Iva,
        Lote_Id,
        Consumible,
        ImagenUrl,
      } = req.body;
      const cloudinaryResult = await cloudinary.uploader.upload(Imagen.path);
      const imagenUrl = cloudinaryResult.secure_url;

      const productos = new Productos({
        Codigo,
        Nombre,
        Descripcion,
        UnidadMedida,
        PrecioUnitario,
        Iva,
        Lote_Id,
        Consumible,
        ImagenUrl: imagenUrl
      });
      productos.save();

      const lote = await Lote.findById(Lote_Id);
      productos.Lote_Id = lote;
      res.json({ productos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putProductos: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        Codigo,
        Nombre,
        Descripcion,
        UnidadMedida,
        PrecioUnitario,
        Iva,
        Lote_Id,
        Consumible,
      } = req.body;
      const productos = await Productos.findByIdAndUpdate(
        id,
        {
          Codigo,
          Nombre,
          Descripcion,
          UnidadMedida,
          PrecioUnitario,
          Iva,
          Lote_Id,
          Consumible,
        },
        { new: true }
      );
      res.json({ productos });

      const lote = await Lote.findById(Lote_Id);
      productos.Lote_Id = lote;
    } catch (error) {
      res.status(400).json({ error: "Error en el servidor" });
    }
  },

  putProductosInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const productos = await Productos.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json({ productos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putProductosActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const productos = await Productos.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json({ productos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpProductos;
