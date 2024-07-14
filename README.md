<p align="center">
  <img src="./public/react.png" alt="React" height="150" />
</p>

<h1 align="center">✨ Products Admin ✨</h1>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.12-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Test-Vitest_-yellow.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/🐳 Docker_-blue.svg" alt="docker"/></a>
  <a href="https://graphql.org"><img src="https://img.shields.io/badge/GraphQL_-F6009B.svg" alt="docker"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwindcss-0EA5E9.svg" alt="tailwindcss"/></a>
  <a href="https://typicode.github.io/husky/"><img src="https://img.shields.io/badge/🐶 Husky-1B1B1F.svg" alt="husky"/></a>
</p>

## 🥷 Accounts

```bash
email: employee@gmail.com
password: Employee12345
```

```bash
email: storer@gmail.com
password: Storer12345
```

## ⚠️ Envars

| env               | example                     | description                  |
| ----------------- | --------------------------- | ---------------------------- |
| PORT              | 4000                        | Development port for the app |
| VITE_APP_VERSION  | 1.0.0                       | App version number           |
| VITE_API_BASE_URL | <http://localhost:8000/api> | Api base url                 |

## 🧑‍💻 Development

Clone the repository or use the template directly:

```bash
git clone https://github.com/A14Narriaga/template-react
```

Copy the environment variables from the example file:

```bash
cp .env.example .env
```

If the node_modules directory not already exist, create it

```bash
mkdir node_modules
```

If you want to run the application in development mode:
Note: Remeber execute all the commands for the repo directly form docker terminal.

```bash
docker compose up dev -d
```
