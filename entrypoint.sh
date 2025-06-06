#!/bin/sh

# Выполнить миграции
npx prisma migrate dev

# (опционально) Генерация клиента
npx prisma generate

# Запуск приложения
npm run start:dev
