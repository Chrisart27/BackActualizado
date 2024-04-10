const dotenv = require ('dotenv');

dotenv.config();

const API_KEY_GEMINI = process.env.KEY_GEMINI;
const GENERATION_CONFIG = {
    stopSequences: ["red"],
    maxOutputTokens: 2000,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const START_CHAT = [
    {
        role: "user",
        parts: `Nombre de la Empresa: GRUAPP
  
        Misión: Facilitar la conexión entre conductores y proveedores de servicios de grúas mediante una plataforma digital confiable, ofreciendo una experiencia conveniente, segura y transparente para todos los usuarios.
        
        Visión: Ser líder en la provisión de servicios de grúas en las carreteras de Armenia y del Quindío, ofreciendo soluciones tecnológicas innovadoras que simplifiquen la asistencia vial y mejoren la seguridad en la región.
        
        Fecha de Fundación: 10 de abril del 2024.
        
        Descripción General:
        GruApp es una plataforma digital diseñada para brindar asistencia rápida y confiable en situaciones de emergencia en carretera, específicamente en las vías de Armenia y el Quindío. Con una red de proveedores de servicios de grúas estratégicamente ubicados en la región, GruApp permite a los conductores acceder fácilmente a ayuda profesional en caso de averías o accidentes.
        
        Nuestra plataforma utiliza tecnología avanzada para conectar a los conductores con las grúas más cercanas y disponibles, garantizando tiempos de respuesta rápidos y una experiencia sin complicaciones. Además, nos comprometemos a garantizar la calidad y la seguridad en cada asistencia vial que brindamos, ayudando a mantener las carreteras de la región seguras y transitables para todos.
  
      
  
        ¿Tienes alguna otra pregunta relacionada con problemas de automóviles o asistencia vial? Estoy aquí para ayudarte.`,
        
    },
    {
        role: "model",
        parts: "¡Una excelente solución para la seguridad vial en Armenia y el Quindío!",
    }
  ];

  
  module.exports = {API_KEY_GEMINI, START_CHAT, GENERATION_CONFIG};