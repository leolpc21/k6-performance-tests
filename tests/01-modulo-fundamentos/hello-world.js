// Comentário do arquivo: Este é um script básico de teste de performance com k6 para o módulo fundamentos
// tests/01-modulo-fundamentos/hello-world.js

// Importa o módulo http do k6 para fazer requisições HTTP
import http from 'k6/http';
// Importa a função check do k6 para validar respostas
import { check } from 'k6';

// Exporta as opções de configuração do teste
export let options = {
  // Define 1 usuário virtual (VU) para executar o teste
  vus: 1,      // 1 usuário virtual
  // Define a duração total do teste em 10 segundos
  duration: '10s',  // Durará 10 segundos
};

// Define a URL base para as requisições
const BASE_URL = 'https://httpbin.org/get';

// Função padrão exportada que será executada pelos VUs
export default function () {
  // Faz uma requisição GET para o site de exemplo
  let response = http.get(BASE_URL);
  
  // Valida se a resposta é bem sucedida
  check(response, {
    // Verifica se o status HTTP é 200 (OK)
    'Status é 200': (r) => r.status === 200,
    // Verifica se o tempo de resposta é menor que 1000ms
    'Tempo de resposta < 1000ms': (r) => r.timings.duration < 1000,
  });
}