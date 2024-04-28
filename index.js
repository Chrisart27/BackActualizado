const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const signingKey = require("./src/config/keys");
const auth = require("./src/routes/getJwt");
const login = require("./src/routes/login");
const register = require("./src/routes/register");
const gruasRoutes = require("./src/routes/gruasRutes");
const getGruasInfoRoute = require("./src/routes/getGruasInfo");
const editarGruaRouter = require("./src/routes/editarGruasRouter"); // Agregado
const eliminarGruaRouter = require("./src/routes/eliminarGruasRouter"); // Agregado
const consultarGruasId = require("./src/routes/consultarGruaIdRouter"); // Agregado
const editarUser = require("./src/routes/editarInfoUser"); // Agregado
const getToken = require("./src/routes/getJwt"); // Agregado
const sendEmail = require("./src/routes/email"); // Agregado
const cambiarEstadoGrua = require("./src/routes/cambiarEstadoGrua"); // Agregado
const obtenerGruasPendientes = require("./src/routes/getGruasPendientes"); // Agregado
const loginAdmin = require("./src/routes/loginAdmin"); // Agregado
const cors = require("cors");

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(cookieParser(signingKey.SIGNING_KEY_COOKIE));

const { API_KEY_GEMINI, START_CHAT, GENERATION_CONFIG } = require("./config");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Establece la ruta base de las imágenes
app.locals.rutaBaseImagenes = "/ruta-base-imagenes"; // Cambia esto según tus necesidades

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/register", register);
app.use("/login", login);
app.use("/gruas", gruasRoutes);
app.use("/getGruasInfo", getGruasInfoRoute);
app.use("/editarGrua", editarGruaRouter); // Agregado
app.use("/eliminarGrua", eliminarGruaRouter); // Agregado
app.use("/gruasClient", consultarGruasId); // Agregado
app.use("/editarUser", editarUser); // Agregado
app.use("/getToken", getToken); // Agregado
app.use("/sendEmail", sendEmail); // Agregado
app.use("/cambiarEstadoGrua", cambiarEstadoGrua); // Agregado
app.use("/getGruasPendiente", obtenerGruasPendientes); // Agregado
app.use("/loginAdmin", loginAdmin); // Agregado

const PORT = process.env.PORT ?? 3000;

app.get("/chat", (req, res) => {
  res.send("GET request to /api/chat");
});

app.post("/chat", async (req, res) => {
  let history = req.body.history;
  let question = req.body.question;
  let historyChat = START_CHAT.concat(history);
  const chat = model.startChat({
    history: historyChat,
    generationConfig: GENERATION_CONFIG,
  });
  const sendQuestion = await chat.sendMessage(question);
  const response = await sendQuestion.response;
  const text = response.text();
  history.push({ role: "user", parts: question });
  history.push({ role: "model", parts: text });
  return res.status(200).json({ history: history });
});

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //by writing an origin like this,
    // server will only allow requests from localhost:5173
  },
});

let usuariosEnLinea = [];

io.on("connection", (socket) => {
  // Envia todos los usuarios en linea a todos los usuarios
  io.emit("obtener-usuarios", JSON.stringify(usuariosEnLinea));
  // Nuevo usuario agregado
  socket.on("nuevo-usuario-agregado", (nuevoIdCliente) => {
    if (
      !usuariosEnLinea.some((usuario) => usuario.idCliente === nuevoIdCliente)
    ) {
      // Si el usuario no se ha agregado antes
      usuariosEnLinea.push({ idCliente: nuevoIdCliente, socketId: socket.id });
      console.log("Hay un nuevo usuario", usuariosEnLinea);
    }
    // Envia todos los usuarios en linea a todos los usuarios
    io.emit("obtener-usuarios", JSON.stringify(usuariosEnLinea));
  });

  socket.on("usuario-desconectado", (idCliente) => {
    // Remueve el usuario de los usuarios activos
    usuariosEnLinea = usuariosEnLinea.filter(
      (usuario) => usuario.idCliente !== idCliente
    );
    console.log("usuario esta desconectado", usuariosEnLinea);
    console.log("usuario desconectado", idCliente);
    // Envia todos los usuarios en linea a todos los usuarios
    io.emit("obtener-usuarios", JSON.stringify(usuariosEnLinea));
  });
});

server.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
