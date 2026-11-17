import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./src/config/swagger";
import estudianteRouter from "./src/routes/estudiante.route";
import docenteRouter from "./src/routes/docente.route";
import matriculaRouter from "./src/routes/matricula.route";

const app = express();

app.use(cors());
app.use(express.json());

// Estado del servidor
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Documentación Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Rutas principales
app.use("/api/estudiantes", estudianteRouter);
app.use("/api/docentes", docenteRouter);
app.use("/matriculas", matriculaRouter);

export default app;
