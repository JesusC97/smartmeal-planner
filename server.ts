import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({ apiKey });
}

// API endpoint: Smart Weekly Menu Suggestion with Gemini AI
app.post('/api/ai/suggest-menu', async (req, res) => {
  try {
    const { dietType = 'mediterránea equilibrada', people = 4 } = req.body;

    if (!aiClient) {
      return res.status(200).json({
        success: false,
        message: 'No hay GEMINI_API_KEY configurada. Usando el generador local de recetas.',
        useFallback: true,
      });
    }

    const prompt = `Genera un menú semanal completo para una familia en España (de Lunes a Domingo, con Almuerzo y Cena para cada día, total 14 comidas).
Estilo: ${dietType}. Número de personas: ${people}.
Para cada plato, indica:
- name: nombre del plato en español
- category: una de "carne", "pescado", "legumbre", "verdura", "pasta", "arroz", "huevos", "sopa"
- prepTimeMinutes: número
- difficulty: "Fácil" o "Media"
- tags: array de strings
- ingredients: array de objetos con { name: string, amount: number, unit: "g"|"kg"|"ml"|"l"|"ud"|"cda", category: "verduras"|"carnes"|"pescados"|"lacteos"|"legumbres"|"despensa"|"panaderia"|"frutas" }
Devuelve ÚNICAMENTE un objeto JSON válido con la clave "plan" que contenga { "lunes": { "almuerzo": {...}, "cena": {...} }, ... "domingo": {...} }.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, plan: parsed.plan || parsed });
  } catch (error: any) {
    console.error('Error generating AI plan:', error);
    return res.status(200).json({
      success: false,
      message: error?.message || 'Error con Gemini API',
      useFallback: true,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// In development, hook up Vite dev server middleware
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Production static serving
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
