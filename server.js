/*
Criado por: Generson Avelino da Silva

Propósito: Facilitar a interação do pregador com os slides de apresentação durante o culto. Dando maior controle ao pregador sobre o tempo de resposta e a velocidade da apresentação.

API Utilizada: Fornecido pelo ProPresenter. Para maior consulta, veja a documentação na pasta "Docs" desse projeto.

Link: https://renewedvision.com/propresenter
*/

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Porta de conexão
const port = 80;

// Variável para guardar as configurações da criação do servidor HTTP
const server = http.createServer((req, res) => {
  // Resolver o caminho do arquivo solicitado
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  let filePathHome = path.join(__dirname, "home.html");

  if (req.url === "/home") {
    filePath = filePathHome;
  }

  // Obter a extensão do arquivo
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".ttf": "font/ttf",
    ".svg": "image/svg+xml",
  };

  // Definir o content type com base na extensão do arquivo
  const contentType = mimeTypes[extname] || "application/octet-stream";

  // Ler o arquivo solicitado
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Arquivo não encontrado
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        // Algum erro do servidor
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Servir o arquivo html
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Função para pegar o IP da maquina
const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "IP not found";
};

// Função para escrever o IP no arquivo "env.js"
function getIPLocal_forAPI() {
  const indexJS_Replace = path.join(__dirname, "src", "config", "env_example.js");
  const indexJS_NewPath = path.join(__dirname, "src", "config", "env.js");

  /*---Se o arquivo existe, não faz nada */
  if (fs.existsSync(indexJS_NewPath)) {
    return;
  }

  // Lê o conteúdo do arquivo
  let content = fs.readFileSync(indexJS_Replace, "utf8");

  // Substitui a palavra desejada
  const newContent = content.replace("IP_LOCAL", getLocalIPAddress());

  // Escreve o conteúdo modificado de volta ao arquivo
  fs.writeFileSync(indexJS_NewPath, newContent);
}

// Função para pegar o IP do arquivo "env.js"
function getIP_env() {
  const envFile = path.join(__dirname, "src", "config", "env.js");
  /*---Se o arquivo existe, não faz nada */
  if (fs.existsSync(envFile)) {
    // Lê o conteúdo do arquivo
    let content = fs.readFileSync(envFile, "utf8");

    // Pega o ip local dentro do arquivo
    const ipRegex = /const\s+localIP\s*=\s*['"](\d{1,3}(?:\.\d{1,3}){3})['"]/;
    const match = content.match(ipRegex);

    if (match) {
      const ip = match[1];
      return ip;
    }
  } else {
    return getLocalIPAddress();
  }
}

// Função para pegar a data e hora atuais
function getDate_and_Hour_Now() {
  const date = new Date();
  const day = date.getDate();
  const dayConverted = day < 10 ? `0${day}` : day;
  const month = date.getMonth() + 1;
  const monthConverted = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();

  const hour = date.getHours();
  const hourConverted = hour < 10 ? `0${hour}` : hour;
  const minute = date.getMinutes();
  const minuteConverted = minute < 10 ? `0${minute}` : minute;

  return [`${dayConverted}/${monthConverted}/${year}`, `${hourConverted}:${minuteConverted}`];
}

// Inicia o servidor
server.listen(port, () => {
  getIPLocal_forAPI();
  const dateActual = getDate_and_Hour_Now();
  const date = dateActual[0];
  const time = dateActual[1];

  const IP_Env = getIP_env();

  console.log(`${date} as ${time} -> Server running sucessfully at http://${IP_Env}:${port}/`);
});
