 # AttestaSafe (клиент)

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Реализация клиентской части для проекта [AttestaSafe](https://github.com/OxideDall/attesta-safe).

## Установка и использование

Предварительно установите NodeJS [совместимой версии](/.nvmrc). Если имеется потребность ипользования нескольких версий NodeJS, то рассмотрите использование [NVM](https://github.com/nvm-sh/nvm) или схожего инструмента для вашей платформы.

```bash
nvm install
nvm use
node --version
npm --version
```

Склонируйте репозиторий и переключитесь в его рабочий каталог. Запустите следующие команды:

```bash
npm install             # установка зависимостей
npm run typechain       # компоновка интерфейсов контрактов для TypeScript
npm run build           # сборка
npm run start           # запуск
```

Имеется возможность запустить версию для локальной отладки:

```bash
npm run dev
```
