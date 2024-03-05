import Item from "../models/ItemPresupuesto.js";

const helpersItem = {
  existeNombre: async (Nombre, req) => {
    if (Nombre) {

      const existe = await Item.findOne({ $text: { $search: Nombre } });
      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese nombre en la base de datos. `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese nombre en la base de datos. `);
        }
      }
    }
  },
};

export default helpersItem;