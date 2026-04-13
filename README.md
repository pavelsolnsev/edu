# University Directory Demo (портфолио)

Каркас Quasar (Vue 3) + SSR: демо-интерфейс каталога вузов. Репозиторий очищен от инфраструктуры заказчика и прод-секретов; тексты и контакты вымышленные.

## Переменные окружения

Скопируйте `.env.example` в `.env` и задайте `API` — базовый URL backend (JSON:API). Без `API` сборка возможна, но запросы к данным не выполнятся. Для карты на списках при необходимости задайте `YANDEX_MAP_API_KEY`; без ключа блок карты не инициализируется.

## Install the dependencies

```bash
yarn
# or
npm install
```

### Install Quasar CLI

```bash
yarn global add @quasar/cli
# or
npm i -g @quasar/cli
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Start the app in development mode with SSR

```bash
quasar dev -m ssr
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Build the app for production with SSR

```bash
quasar build -m ssr
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
