// ═══════════════════════════════════════════════════════════
//  BANCO DE PREGUNTAS – JEOPARDY FILOSOFÍA
//  Se seleccionan 5 al azar por categoría en cada partida
// ═══════════════════════════════════════════════════════════

const QUESTION_POOL = {
  CLÁSICA: [
    { points: 100, clue: "Maestro de Alejandro Magno", answer: "Aristóteles" },
    { points: 100, clue: "Filósofo que fue condenado a beber cicuta", answer: "Sócrates" },
    { points: 100, clue: "Ciudad griega considerada cuna de la democracia y la filosofía", answer: "Atenas" },
    { points: 200, clue: "Escribió La República y habló de la caverna", answer: "Platón" },
    { points: 200, clue: "Escuela filosófica fundada por Platón", answer: "La Academia" },
    { points: 200, clue: "Disciplina que Aristóteles llamó 'la ciencia primera'", answer: "Filosofía / Metafísica" },
    { points: 300, clue: "Su método era hacer preguntas para llegar a la verdad", answer: "Mayéutica socrática" },
    { points: 300, clue: "Doctrina aristotélica que busca el punto medio entre dos extremos", answer: "El justo medio" },
    { points: 300, clue: "Filósofo cínico que vivía en un barril y buscaba un hombre honesto", answer: "Diógenes de Sinope" },
    { points: 400, clue: "Aristóteles llamó así a la ciencia del ser en cuanto ser", answer: "Metafísica" },
    { points: 400, clue: "Concepto platónico del bien supremo que ilumina toda realidad", answer: "La Idea del Bien" },
    { points: 400, clue: "Término aristotélico para la felicidad o plenitud de la vida", answer: "Eudaimonía" },
    { points: 400, clue: "Escuela filosófica que enseñaba a vivir con indiferencia al sufrimiento", answer: "Estoicismo" },
    { points: 500, clue: "Platón usó este término para las formas perfectas e inmutables", answer: "Ideas / Formas" },
    { points: 500, clue: "Lógica formal inventada por Aristóteles basada en premisas y conclusiones", answer: "Silogismo" },
    { points: 500, clue: "Concepto aristotélico: actualización de lo que está en potencia", answer: "Entelequia" },
    { points: 500, clue: "Escuela fundada por Epicuro que buscaba el placer como ausencia de dolor", answer: "Epicureísmo" },
  ],
  PRESOCRÁTICA: [
    { points: 100, clue: "Dijo que el agua es el principio de todo", answer: "Tales de Mileto" },
    { points: 100, clue: "Se le considera el primer filósofo de la historia", answer: "Tales de Mileto" },
    { points: 100, clue: "Término griego para el principio originario de todas las cosas", answer: "Arjé" },
    { points: 200, clue: "Sostuvo que todo fluye y que el fuego es el arjé", answer: "Heráclito" },
    { points: 200, clue: "Propuso el ápeiron (lo indefinido) como principio de todo", answer: "Anaximandro" },
    { points: 200, clue: "Afirmó que el aire es la sustancia fundamental del universo", answer: "Anaxímenes" },
    { points: 300, clue: "Dijo que el ser es uno, eterno e inmóvil", answer: "Parménides" },
    { points: 300, clue: "Planteó paradojas para demostrar que el movimiento es imposible", answer: "Zenón de Elea" },
    { points: 300, clue: "Filósofo que dijo 'todo es número'", answer: "Pitágoras" },
    { points: 300, clue: "Famosa paradoja en la que Aquiles nunca alcanza a la tortuga", answer: "Paradoja de Zenón" },
    { points: 400, clue: "Propuso cuatro elementos: tierra, agua, fuego y aire", answer: "Empédocles" },
    { points: 400, clue: "Su filosofía distingue entre el camino de la verdad y el de la opinión", answer: "Parménides" },
    { points: 400, clue: "Propuso que todo está compuesto de partículas indivisibles", answer: "Demócrito (Atomismo)" },
    { points: 500, clue: "Introdujo el nous como principio ordenador del cosmos", answer: "Anaxágoras" },
    { points: 500, clue: "Concepto de Heráclito para la ley universal que gobierna el cambio", answer: "Logos" },
    { points: 500, clue: "Demócrito y su maestro fundaron esta corriente sobre partículas indivisibles", answer: "Atomismo" },
  ],
  MEDIEVAL: [
    { points: 100, clue: "Escribió La Ciudad de Dios y las Confesiones", answer: "San Agustín" },
    { points: 100, clue: "Período filosófico dominado por la relación entre fe y razón", answer: "Filosofía Medieval" },
    { points: 100, clue: "Religión cuya teología influyó profundamente en la filosofía medieval", answer: "Cristianismo" },
    { points: 200, clue: "Fusionó filosofía aristotélica con teología cristiana", answer: "Santo Tomás de Aquino" },
    { points: 200, clue: "Obra cumbre de Tomás de Aquino que sistematiza la teología", answer: "Suma Teológica" },
    { points: 200, clue: "Método filosófico medieval de debate sistemático con argumentos y contra-argumentos", answer: "Escolástica" },
    { points: 300, clue: "Debate sobre si los universales existen o son solo nombres", answer: "Querella de los universales" },
    { points: 300, clue: "Principio que dice que no se deben multiplicar entidades sin necesidad", answer: "Navaja de Ockham" },
    { points: 300, clue: "Santo que formuló las cinco vías para demostrar la existencia de Dios", answer: "Santo Tomás de Aquino" },
    { points: 400, clue: "Filósofo árabe llamado El Comentador por comentar a Aristóteles", answer: "Averroes" },
    { points: 400, clue: "Filósofo judío medieval autor de La guía de los perplejos", answer: "Maimónides" },
    { points: 400, clue: "Doctor de la Iglesia que dijo: 'Creo para entender'", answer: "San Anselmo" },
    { points: 400, clue: "Filósofo persa que escribió El canon de medicina y El libro de la curación", answer: "Avicena" },
    { points: 500, clue: "Propuso el argumento ontológico: Dios existe porque es el ser mayor concebible", answer: "San Anselmo" },
    { points: 500, clue: "Concepto agustiniano de que el mal no es cosa sino ausencia de bien", answer: "Privatio boni" },
    { points: 500, clue: "Doctrina averroísta que separaba las verdades de fe de las de razón", answer: "Doble verdad" },
    { points: 500, clue: "Teoría de la iluminación divina del conocimiento, propuesta por San Agustín", answer: "Iluminismo agustiniano" },
  ],
};

/**
 * Selecciona 5 preguntas aleatorias de cada categoría,
 * asignando puntajes de 100 a 500.
 */
export function generateGameCategories() {
  const pointValues = [100, 200, 300, 400, 500];

  return Object.entries(QUESTION_POOL).map(([name, pool]) => {
    // Agrupar por rango de puntos
    const byTier = {};
    for (const q of pool) {
      const tier = q.points;
      if (!byTier[tier]) byTier[tier] = [];
      byTier[tier].push(q);
    }

    // Para cada nivel de 100-500, elige una pregunta aleatoria del tier correspondiente
    const selected = pointValues.map(val => {
      const tierQuestions = byTier[val] || [];
      if (tierQuestions.length === 0) return { points: val, clue: "—", answer: "—" };
      const pick = tierQuestions[Math.floor(Math.random() * tierQuestions.length)];
      return { ...pick, points: val };
    });

    return { name, questions: selected };
  });
}

// For backward compat
export const CATEGORIES = generateGameCategories();
