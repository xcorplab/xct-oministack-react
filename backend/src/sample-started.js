const express = require('express');
const app = express();

//GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar rout params (para edição, delete)
// reg.body = Acessar o corpo da requisição (para criação, edição)

app.use(express.json());
app.post("/users", (req, res) => {
    return res.json(req.body);
});

app.listen(1630);
