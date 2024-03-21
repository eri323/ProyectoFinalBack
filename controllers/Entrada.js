import helpersGeneral from "../helpers/General.js";
import Entrada from "../models/Entrada.js"

const httpEntrada = {
    getEntrada: async (req, res) => {
        try {
            const entrada = await Entrada.find();
            res.json(entrada);
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getEntradaId: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findById(id);
            res.json(entrada);
        } catch (error) {
            res.status(400).json({ error });

        }
    },
    postEntrada: async (req, res) => {
        try {
            const { Cantidad, Producto_id, Total } = req.body;
            const nuevaEntrada = new Entrada({ Cantidad, Producto_id, Total });
            const entradaGuardada = await nuevaEntrada.save();
            res.json(entradaGuardada);

        } catch (error) {
            res.status(400).json({ error });

        }

    },
    putEntrada: async (req, res) => {
        try {
            const { id } = req.params;
            const { Cantidad, Producto_id, Total } = req.body;
            const entradaActualizada = await Entrada.findByIdAndUpdate(
                id,
                {
                    Cantidad,
                    Producto_id,
                    Total
                },
                { new: true }
            );
            res.json(entradaActualizada);

        } catch (error) {
            res.status(400).json({ error })

        }
    },
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findByIdAndUpdate(
                id,
                { Estado: 1 },
                { new: true }
            );
            res.json(entrada)
        } catch (error) {
            res.status(400).json({ error })

        }

    },
    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const entrada = await Entrada.findByIdAndUpdate(
                id,
                { Estado: 0 },
                { new: true }
            );
            res.json(entrada)

        } catch (error) {
            res.status(400).json({ error })

        }
    }



};
export default httpEntrada;


