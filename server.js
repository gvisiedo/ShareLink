require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const {PORT} = precess.env;

const app = express();

//middleware morgan para loguear peticiones http
app.use(morgan("dev"));

// middleware para parsear el json del body
app.use(express.json());

//ENDPOINTS


//Express Listen
app.listen(PORT,()=>{
    console.log(`Servidor activo en http://127.0.0.1:${PORT}`);
})

