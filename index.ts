import "dotenv/config";
import app from "./app";
import estudianteRouter from "./src/routes/estudiante.route";
import docenteRouter from "./src/routes/docente.route";
import matriculaRouter from "./src/routes/matricula.route";

const PORT = process.env.PORT || 3000;

app.use("/api/estudiantes", estudianteRouter);
app.use("/api/docentes", docenteRouter);
app.use("/matriculas", matriculaRouter);

app.listen(PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
  console.log(`SWAGGER UI DISPONIBLE EN http://localhost:${PORT}/api-docs`);
});
