// Este é o código do seu "mensageiro" (Netlify Function)
// Caminho: netlify/functions/send-to-zapier.js

exports.handler = async (event) => {
  // O link do seu Zapier fica seguro aqui no "back-end"
  const ZAPIER_URL = "https://hooks.zapier.com/hooks/catch/25030361/urdhuxe/";

  // 1. Verifica se os dados estão sendo enviados (método POST)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. Pega os dados que o quiz.html enviou
    const data = JSON.parse(event.body);

    // 3. Envia os dados para o Zapier (como servidor, sem erro CORS)
    await fetch(ZAPIER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // 4. Retorna uma resposta de sucesso para o quiz.html
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Dados enviados ao Zapier!" }),
    };
  } catch (error) {
    // 5. Em caso de erro
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao enviar dados." }),
    };
  }
};
