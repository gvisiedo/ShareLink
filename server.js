require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const {PORT} = process.env;

const app = express();

//middleware morgan para loguear peticiones http
app.use(morgan("dev"));

// middleware para parsear el json del body
app.use(express.json());

//ENDPOINTS

//middleware errores
app.use((error, req, res, next)=>{
    res.status(error.httpStatus).send({
        status: "error",
        message: error.message,
    });
});

//middleware 404 not found
app.use((req,res)=>{
    res.status(404).send({
        status: "error",
        message: "Not found"
    });
});

//Express Listen
app.listen(PORT,()=>{
    console.log(`Servidor activo en http://127.0.0.1:${PORT}`);
})

