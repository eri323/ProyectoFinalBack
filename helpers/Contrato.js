import Contrato from "../models/Contrato.js";

const helpersContrato = {
  existeNombre: async (Nombre, req) => {
    if (Nombre) {

      const existe = await Contrato.findOne({ $text: { $search: Nombre } });
      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese Nombre en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese Nombre en la base de datos!!! `);
        }
      }
    }
  },
  existeCodigo: async (Codigo, req) => {
    if (Codigo) {

      const existe = await Contrato.findOne({ $text: { $search: Codigo } });
      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese Codigo en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese Codigo en la base de datos!!! `);
        }
      }
    }
  },
};

export default helpersContrato;