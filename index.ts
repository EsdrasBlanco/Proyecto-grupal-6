import "dotenv/config";
import express from "express";
import cors from "cors";
import aulaRoutes from "./src/routes/aula.routes";
import cursoRoutes from "./src/routes/curso.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/aulas", aulaRoutes);
app.use("/api/cursos", cursoRoutes);

app.listen(PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
  console.log(`SWAGGER UI DISPONIBLE EN http://localhost:${PORT}/api-docs`);
});

import matriculaRouter from "./routes/matricula.route.js";

app.use("/matriculas", matriculaRouter);