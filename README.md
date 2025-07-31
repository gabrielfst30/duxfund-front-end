# 🪙 DuxFund - Frontend

**DuxFund** é uma aplicação web moderna desenvolvida com **Next.js** que integra a blockchain **XRPL (XRP Ledger)**, oferecendo funcionalidades completas de transações de criptomoedas e mintagem de NFTs.

---

## 🚀 Tecnologias Utilizadas

* **Next.js 15** – Framework React com suporte ao App Router
* **React 19** – Biblioteca para construção de interfaces reativas
* **TypeScript** – Tipagem estática para maior segurança
* **SASS/SCSS** – Estilização modular e avançada
* **Prisma ORM** – Integração com banco de dados MySQL
* **XRPL.js** – Biblioteca oficial para interações com o XRP Ledger

---

## 🔧 Funcionalidades Principais

* **Criação de carteiras XRPL** – Geração automática de wallets
* **Fundação de carteiras** – Depósito inicial automatizado (apenas para testes)
* **Transações de pagamento** – Envio de XRP entre contas
* **Mintagem de NFTs** – Criação de NFTs baseados em cada transação executada
* **Histórico de transações** – Armazenamento e consulta via banco de dados

---

## 🗃️ Estrutura do Banco de Dados (MySQL + Prisma)

* **`transactions`** – Registro principal das transações realizadas
* **`payments`** – Detalhes específicos de cada pagamento
* **`nftMints`** – Informações dos NFTs gerados no processo

---

## 🛠️ Como Executar o Projeto Localmente

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente (exemplo abaixo)
# .env
DATABASE_URL="mysql://user:password@localhost:3306/duxfund"

# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🌐 Endpoints da API

| Método | Rota                            | Descrição                              |
| ------ | ------------------------------- | -------------------------------------- |
| POST   | `/api/create_wallet`            | Cria uma nova carteira XRPL            |
| POST   | `/api/fund_wallet`              | Funda uma carteira para fins de teste  |
| POST   | `/api/send_transaction`         | Executa uma transação e gera um NFT    |
| GET    | `/api/last_ledger_transactions` | Retorna as últimas transações gravadas |

---

## 📌 Observações Finais

Este projeto representa uma solução completa para interação com a blockchain **XRPL**, combinando:

* Geração e gestão de carteiras
* Execução de pagamentos em XRP
* Mintagem de NFTs
* Persistência de dados com banco relacional
* Interface moderna e robusta com React/Next.js
