import { Router } from "express";
import { check } from "express-validator";
import httpProducto from "../controllers/Producto.js"
import helpersGeneral from "../helpers/General.js";
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();

routers.get('/productobusca', [validarCampos], httpProducto.getProductos); 

routers.get('/Productobuscaid/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.getProductosId); 

routers.post('/productocrear', [ 
    check("Codigo", "Ingrese codigo Producto").not().isEmpty(), 
    check("Nombre", "Ingrese nombre Producto").not().isEmpty(), 
    check('Nombre').custom(helpersGeneral.verificarEspacios), 

    check("Descripcion", "Ingrese descripcion del Producto").not().isEmpty(),
    check('Descripcion').custom(helpersGeneral.verificarEspacios),  

    check("UnidadMedida", "Ingrese la unidad de medida").not().isEmpty(), 
    check("PrecioUnitario", "Ingrese el precio unitario").not().isEmpty(),
    check("Iva", "Ingrese el iva del producto ").not().isEmpty(),  
    check("Consumible", "¿Es consumible o no?").not().isEmpty(),
    check("Lote_Id", "Ingrese el lote").not().isEmpty(),
   /*  check('Consumible').custom(helpersGeneral.verificarEspacios),  */  
    
    validarCampos
], httpProducto.postProductos); 

routers.put('/productomodificar/:id', [ 
    check("Codigo", "Ingrese codigo Producto").not().isEmpty(), 

    check("Nombre", "Ingrese nombre Producto").not().isEmpty(),
    check("Nombre").custom(helpersGeneral.verificarEspacios), 

    check("Descripcion", "Ingrese descripcion del Producto").not().isEmpty(),
    check("Descripcion").custom(helpersGeneral.verificarEspacios),  

    check("UnidadMedida", "Ingrese la unidad de medida").not().isEmpty(), 
    check("PrecioUnitario", "Ingrese el precio unitario").not().isEmpty(),
    check("Iva", "Ingrese el iva del producto ").not().isEmpty(),

    check("Consumible", "¿Es consumible o no?").not().isEmpty(),
    check("Lote_Id", "Ingrese el lote").not().isEmpty(),
    validarCampos
  ], httpProducto.putProductos); 

routers.put('/productoinac/:id', [ 
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.putProductosInactivar);

routers.put('/productoact/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.putProductosActivar);

export default routers;