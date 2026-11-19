type FotoLocal = { source: number; autor?: string; licenca?: string; pagina?: string; ajuste?: "contain"; galeria?: { source: number; descricao: string }[] };

const fotosLocais: Record<string, FotoLocal | undefined> = {
  "cachoeira-da-roncadeira": {
    source: require("../../assets/images/locais/cachoeira-da-roncadeira.png"),
    autor: "Nibelle Aires Lira e Fernando Mayer Pelicice",
    licenca: "CC BY-NC-ND 4.0",
    pagina: "https://periodicos.unifesp.br/ecoturismo/article/view/6837",
    ajuste: "contain",
  },
  "praca-dos-girassois": {
    source: require("../../assets/images/locais/praca-dos-girassois-1.png"),
    galeria: [
      { source: require("../../assets/images/locais/praca-dos-girassois-1.png"), descricao: "Fachada do Palácio Araguaia vista da Praça dos Girassóis" },
      { source: require("../../assets/images/locais/praca-dos-girassois-2.png"), descricao: "Conjunto de esculturas na Praça dos Girassóis" },
      { source: require("../../assets/images/locais/praca-dos-girassois-3.png"), descricao: "Monumento à Bíblia e marco do Centro Geodésico do Brasil" },
      { source: require("../../assets/images/locais/praca-dos-girassois-4.png"), descricao: "Cascata com o Palácio Araguaia ao fundo" },
      { source: require("../../assets/images/locais/praca-dos-girassois-5.png"), descricao: "Espelho d'água entre jardins da praça" },
      { source: require("../../assets/images/locais/praca-dos-girassois-6.png"), descricao: "Cruzeiro e altar ao ar livre" },
    ],
  },
  "memorial-coluna-prestes": {
    source: require("../../assets/images/locais/memorial-coluna-prestes.jpg"),
    autor: "Brunno Oliveira",
    licenca: "CC BY 2.0",
    pagina: "https://commons.wikimedia.org/wiki/File:Memorial_Coluna_Prestes_01.jpg",
  },
  "palacinho": {
    source: require("../../assets/images/locais/palacinho-1.png"),
    galeria: [
      { source: require("../../assets/images/locais/palacinho-1.png"), descricao: "Fachada de madeira do Palacinho e palmeiras" },
      { source: require("../../assets/images/locais/palacinho-2.png"), descricao: "Caminho arborizado até a capela do complexo" },
      { source: require("../../assets/images/locais/palacinho-3.png"), descricao: "Pátio e construções do Museu Histórico do Tocantins" },
      { source: require("../../assets/images/locais/palacinho-4.png"), descricao: "Objetos e mobiliário em exposição no museu" },
    ],
  },
  "espaco-cultural-jose-gomes-sobrinho": {
    source: require("../../assets/images/locais/espaco-cultural-1.png"),
    galeria: [
      { source: require("../../assets/images/locais/espaco-cultural-1.png"), descricao: "Vista externa da cobertura do Espaço Cultural" },
      { source: require("../../assets/images/locais/espaco-cultural-2.png"), descricao: "Praça coberta e estrutura metálica do Espaço Cultural" },
      { source: require("../../assets/images/locais/espaco-cultural-3.png"), descricao: "Vista lateral do complexo e do volume com mural" },
    ],
  },
  "feira-304-sul": {
    source: require("../../assets/images/locais/feira-304-sul-1.png"),
    galeria: [
      { source: require("../../assets/images/locais/feira-304-sul-1.png"), descricao: "Bancas de hortifrúti no interior da Feira da 304 Sul" },
      { source: require("../../assets/images/locais/feira-304-sul-2.png"), descricao: "Banca com doces, castanhas e produtos regionais" },
      { source: require("../../assets/images/locais/feira-304-sul-3.png"), descricao: "Bolsas e acessórios artesanais de palha" },
    ],
  },
  "parque-povos-indigenas": {
    source: require("../../assets/images/locais/parque-povos-indigenas-1.png"),
    galeria: [
      { source: require("../../assets/images/locais/parque-povos-indigenas-1.png"), descricao: "Área arborizada com playground e equipamentos de exercício" },
      { source: require("../../assets/images/locais/parque-povos-indigenas-2.png"), descricao: "Caminhos de passeio entre árvores e gramados" },
    ],
  },
  "parque-cesamar": {
    source: require("../../assets/images/locais/parque-cesamar-capa.png"),
    galeria: [
      { source: require("../../assets/images/locais/parque-cesamar-1.png"), descricao: "Cascata e espelho d'água" },
      { source: require("../../assets/images/locais/parque-cesamar-2.png"), descricao: "Capivaras no gramado" },
      { source: require("../../assets/images/locais/parque-cesamar-3.png"), descricao: "Marco do parque e vista do lago" },
      { source: require("../../assets/images/locais/parque-cesamar-4.png"), descricao: "Pista de skate à noite" },
      { source: require("../../assets/images/locais/parque-cesamar-5.png"), descricao: "Letreiro Eu amo Palmas junto ao lago" },
    ],
  },
  "praia-da-graciosa": {
    source: require("../../assets/images/locais/praia-da-graciosa-1.png"),
  },
};

const idsDoBanco: Record<string, string | undefined> = {
  "30000000-0000-4000-8000-000000000008": "parque-povos-indigenas",
  "30000000-0000-4000-8000-000000000007": "feira-304-sul",
  "30000000-0000-4000-8000-000000000005": "espaco-cultural-jose-gomes-sobrinho",
  "30000000-0000-4000-8000-000000000009": "cachoeira-da-roncadeira",
  "30000000-0000-4000-8000-000000000001": "praca-dos-girassois",
  "30000000-0000-4000-8000-000000000002": "memorial-coluna-prestes",
  "30000000-0000-4000-8000-000000000003": "palacinho",
  "30000000-0000-4000-8000-000000000004": "parque-cesamar",
  "30000000-0000-4000-8000-000000000006": "praia-da-graciosa",
};

export function buscarFotoLocal(id: string) {
  return fotosLocais[idsDoBanco[id] ?? id];
}
