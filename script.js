// 1. Estrutura de dados para armazenar os exercícios
const exercicios = {
  peito: [
    "Supino inclinado (Maquina, alterer, barra)",
    "Supino reto (Máquina, alterer, barra)",
    "Supino declinado (Máquina, barra)",
    "Cross over polia alta",
    "Cross over polia baixa",
    "Voador",
    "Paralela",
  ],
  costas: [
    "Barra fixa pronada/supinada",
    "Puxada alta pronada/neutra/supinada",
    "Remada com alter",
    "Remada sagital na máquina",
    "Remada pronada/supinada/neutra",
    "Remada curvada",
    "Remada Cavalinho",
    "Pull down",
  ],
  biceps: [
    "Scott (maquina, alterer, barra w)",
    "Rosca bayesiana (polia, maquina, alterer)",
    "Rosca direta (alterer, barra w, polia)",
    "Rosca martelo (alterer, polia)",
  ],
  triceps: [
    "Tríceps na polia (Corda, barra W)",
    "Frances (Polia, alterer)",
    "Testa (polia, alterer)",
    "Coice (polia)",
  ],
  ombro: [
    "Elevação lateral (Polia, alterer, máquina)",
    "Elevação frontal (Polia, alterer)",
    "Desenvolvimento (alterer, Maquina)",
    "Voador ao contrário (máquina alterer)",
  ],
  perna: [
    "Extensora",
    "Flexora (mesa, cadeira)",
    "Adutor",
    "Abdutor",
    "Agachamento",
    "Leg press",
    "Stiff",
    "Coice",
    "Elevação pélvica",
    "Panturrilha",
  ],
};

// Função para selecionar um exercício aleatório de um grupo muscular
function getExercicioAleatorio(grupo) {
  const lista = exercicios[grupo];
  if (!lista || lista.length === 0) return "Nenhum exercício encontrado";
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

// Função para obter exercícios aleatórios sem repetição para um treino
function getExerciciosUnicos(grupo, quantidade) {
  const lista = exercicios[grupo];
  if (!lista || lista.length < quantidade) {
    // Retorna o que for possível se não houver exercícios suficientes
    return [...(lista || [])];
  }

  const exerciciosSelecionados = new Set();
  while (exerciciosSelecionados.size < quantidade) {
    const indice = Math.floor(Math.random() * lista.length);
    exerciciosSelecionados.add(lista[indice]);
  }
  return Array.from(exerciciosSelecionados);
}

// --- Funções de Geração de Treino por Nível ---

function gerarTreinoIniciante(dados, infoGeral) {
  let treino = `Nível: Iniciante (Full Body)\n`;
  treino += `Frequência: Treinar nos dias escolhidos com pelo menos 1 dia de descanso entre eles.\n`;
  treino += infoGeral;

  if (dados.objetivo === "perda_peso") {
    treino +=
      "TREINO 1 (Bi-sets para otimizar o tempo e aumentar o gasto calórico):\n";
    treino += `1A. Voador\n1B. Panturrilha em pé\n\n`;
    treino += `2A. Tríceps Pulley\n2B. Pull down\n\n`;
    treino += `3A. Rosca Bíceps\n3B. Leg Press\n\n`;
    treino += `4A. Mesa Flexora\n4B. Elevação Lateral\n\n`;
    treino += "TREINO 2 (Alternativo):\n";
    treino += `1A. Supino Inclinado com Halteres\n1B. Agachamento no Banco\n\n`;
    treino += `2A. Puxada Alta\n2B. Tríceps Francês com Halter\n\n`;
    treino += `3A. Cadeira Abdutora\n3B. Rosca Bíceps com Halter\n\n`;
    treino += `4A. Cadeira Adutora\n4B. Panturrilha em pé\n`;
  } else {
    // Hipertrofia
    treino += "TREINO A (Repetir em todos os dias de treino):\n";
    treino += `1. Peito: ${getExercicioAleatorio("peito")}\n`;
    treino += `2. Costas: ${getExercicioAleatorio("costas")}\n`;
    treino += `3. Perna (foco quadríceps): Agachamento ou Leg press\n`;
    treino += `4. Perna (foco posterior): Stiff ou Mesa Flexora\n`;
    treino += `5. Ombro: ${getExercicioAleatorio("ombro")}\n`;
    treino += `6. Bíceps: ${getExercicioAleatorio("biceps")}\n`;
    treino += `7. Tríceps: ${getExercicioAleatorio("triceps")}\n`;
  }
  return treino;
}

function gerarTreinoIntermediario(dados, infoGeral) {
  let treino = `Nível: Intermediário\n`;
  treino += infoGeral;
  const dias = parseInt(dados.dias_semana, 10);

  switch (dias) {
    case 3: // Push Pull Legs
      treino += "Divisão de Treino: Push/Pull/Legs\n\n";
      const [peito1, peito2, peito3] = getExerciciosUnicos("peito", 3);
      const [costas1, costas2, costas3] = getExerciciosUnicos("costas", 3);
      const [ombro1, ombro2] = getExerciciosUnicos("ombro", 2);
      const [triceps1, triceps2] = getExerciciosUnicos("triceps", 2);
      const [biceps1, biceps2] = getExerciciosUnicos("biceps", 2);

      treino += "TREINO A (Push):\n";
      treino += `1. Peito: ${peito1}\n2. Peito: ${peito2}\n3. Peito: ${peito3}\n`;
      treino += `4. Ombro: ${ombro1}\n5. Ombro: ${ombro2}\n`;
      treino += `6. Tríceps: ${triceps1}\n7. Tríceps: ${triceps2}\n\n`;

      treino += "TREINO B (Pull):\n";
      treino += `1. Costas: ${costas1}\n2. Costas: ${costas2}\n3. Costas: ${costas3}\n`;
      treino += `4. Bíceps: ${biceps1}\n5. Bíceps: ${biceps2}\n\n`;

      treino += "TREINO C (Legs):\n";
      treino += `1. Padrão de Agachamento: Agachamento ou Leg Press\n`;
      treino += `2. Extensora\n`;
      treino += `3. Flexora\n`;
      treino += `4. Glúteo: ${getExercicioAleatorio("perna")}\n`; // Simplificado
      treino += `5. Panturrilha\n`;
      break;

    case 4: // Push Legs Pull Legs
      treino += "Divisão de Treino: Push/Legs/Pull/Legs\n\n";
      treino += "TREINO A (Push):\n";
      treino += `1. Peito: ${getExerciciosUnicos("peito", 3).join(
        "\n2. Peito: "
      )}\n`;
      treino += `3. Ombro: ${getExerciciosUnicos("ombro", 2).join(
        "\n4. Ombro: "
      )}\n`;
      treino += `5. Tríceps: ${getExerciciosUnicos("triceps", 2).join(
        "\n6. Tríceps: "
      )}\n\n`;

      treino += "TREINO B (Legs 1 - Foco Quadríceps):\n";
      treino += `1. Padrão de Agachamento: ${getExercicioAleatorio("perna")}\n`;
      treino += `2. Padrão de Agachamento: ${getExercicioAleatorio("perna")}\n`;
      treino += `3. Extensora\n\n`;

      treino += "TREINO C (Pull):\n";
      treino += `1. Costas: ${getExerciciosUnicos("costas", 3).join(
        "\n2. Costas: "
      )}\n`;
      treino += `3. Bíceps: ${getExerciciosUnicos("biceps", 2).join(
        "\n4. Bíceps: "
      )}\n\n`;

      treino += "TREINO D (Legs 2 - Foco Posterior):\n";
      treino += `1. Stiff\n`;
      treino += `2. Flexora\n`;
      treino += `3. Glúteo: ${getExercicioAleatorio("perna")}\n`;
      break;

    case 5:
    case 6:
      treino +=
        "Divisão de Treino: Push/Pull/Legs/Upper/Lower (sugestão para 5 dias)\n\n";
      treino +=
        "Para 5 ou 6 dias, a complexidade aumenta. Uma divisão PPL + Upper/Lower é uma boa opção.\n";
      treino +=
        "Por favor, consulte um profissional para uma periodização detalhada.\n";
      treino +=
        "Como sugestão, você pode repetir um dos treinos da semana ou focar em um ponto fraco.\n";
      break;

    default:
      treino += "Número de dias inválido. Selecione entre 3 e 6 dias.";
  }
  return treino;
}

function gerarTreinoAvancado(dados, infoGeral) {
  let treino = `Nível: Avançado\n`;
  treino += infoGeral;
  const dias = parseInt(dados.dias_semana, 10);

  if (dias < 4) {
    return "Para o nível avançado, recomenda-se treinar no mínimo 4 dias para a divisão Upper/Lower.";
  }

  treino += "Divisão de Treino: Upper/Lower\n\n";

  treino += "TREINO A (Upper 1 - Foco Costas):\n";
  treino += `1. Costas: ${getExerciciosUnicos("costas", 2).join(
    "\n2. Costas: "
  )}\n`;
  treino += `3. Peito: ${getExercicioAleatorio("peito")}\n`;
  treino += `4. Ombro: ${getExercicioAleatorio("ombro")}\n`;
  treino += `5. Bíceps: ${getExercicioAleatorio("biceps")}\n`;
  treino += `6. Tríceps: ${getExercicioAleatorio("triceps")}\n\n`;

  treino += "TREINO B (Lower 1 - Foco Quadríceps):\n";
  treino += `1. Padrão de Agachamento: ${getExercicioAleatorio("perna")}\n`;
  treino += `2. Padrão de Agachamento: ${getExercicioAleatorio("perna")}\n`;
  treino += `3. Extensora\n`;
  treino += `4. Panturrilha\n\n`;

  treino += "TREINO C (Upper 2 - Foco Peito):\n";
  treino += `1. Peito: ${getExerciciosUnicos("peito", 2).join(
    "\n2. Peito: "
  )}\n`;
  treino += `3. Costas: ${getExercicioAleatorio("costas")}\n`;
  treino += `4. Ombro: ${getExercicioAleatorio("ombro")}\n`;
  treino += `5. Bíceps: ${getExercicioAleatorio("biceps")}\n`;
  treino += `6. Tríceps: ${getExercicioAleatorio("triceps")}\n\n`;

  treino += "TREINO D (Lower 2 - Foco Posterior):\n";
  treino += `1. Stiff\n`;
  treino += `2. Flexora\n`;
  treino += `3. Elevação Pélvica\n`;

  return treino;
}

// Adiciona o listener ao formulário
document
  .getElementById("workout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());

    let treinoMontado = `--- SEU TREINO PERSONALIZADO ---\n\n`;
    let series = "3-4 séries";
    let repeticoes = "";

    switch (dados.objetivo) {
      case "perda_peso":
        repeticoes = "12-15 repetições";
        break;
      case "hipertrofia":
        repeticoes = "8-12 repetições";
        break;
    }

    const infoGeral = `${series} de ${repeticoes}\n\n`;

    if (dados.nivel === "iniciante") {
      treinoMontado += gerarTreinoIniciante(dados, infoGeral);
    } else if (dados.nivel === "intermediario") {
      treinoMontado += gerarTreinoIntermediario(dados, infoGeral);
    } else if (dados.nivel === "avancado") {
      treinoMontado += gerarTreinoAvancado(dados, infoGeral);
    } else {
      treinoMontado += "Nível de treino não reconhecido.";
    }

    // Aplica técnicas avançadas baseadas na lógica
    if (dados.tempo_treino === "30") {
      treinoMontado += "\n\nTÉCNICA AVANÇADA APLICADA (Tempo de 30 min):\n";
      treinoMontado +=
        "-> Superset: Realize os exercícios em pares (ex: 1A e 1B) sem descanso entre eles para otimizar o tempo.\n";
    }
    if (dados.objetivo === "perda_peso" && dados.nivel !== "iniciante") {
      treinoMontado +=
        "\n\nTÉCNICA AVANÇADA APLICADA (Objetivo Perda de Peso):\n";
      treinoMontado +=
        "-> Bi-set (Antagonista): Combine exercícios de músculos opostos (ex: Peito e Costas, Bíceps e Tríceps) para aumentar o gasto calórico.\n";
    }

    const resultadoDiv = document.getElementById("resultado-treino");
    resultadoDiv.textContent = treinoMontado;
    resultadoDiv.style.display = "block";
  });
