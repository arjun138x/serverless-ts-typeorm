# Serverless TypeScript + TypeORM Example

This is a starter project demonstrating:

- AWS Lambda with Serverless Framework
- TypeScript
- TypeORM with two separate DB schemas (db1 and db2)
- AWS Lambda Layers for shared/reusable code (db + utils)
- Minimal example handlers: user, order, product

## Assumptions

- PostgreSQL is used (pg driver)
- You will provide environment variables: DB_HOST, DB_USER, DB_PASS, DB1_NAME, DB2_NAME
- This is a template: enable migrations and production config as needed

## Quick start (local)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables (local `.env` or export in shell)
   ```
   export DB_HOST=localhost
   export DB_USER=postgres
   export DB_PASS=yourpass
   export DB1_NAME=db_schema1
   export DB2_NAME=db_schema2
   ```
3. Run offline:

   ```bash
   npx serverless offline
   ```

   For Clean and Rebuild

   ```bash
   rm -rf .esbuild .serverless .webpack dist
   npm run dev
   ```

4. Test endpoints:
   - `GET http://localhost:3000/dev/users/1`
   - `GET http://localhost:3000/dev/orders/1`
   - `GET http://localhost:3000/dev/products`

## 📂 Project Folder Structure

```
serverless-aws-ts-typeorm/
│
├── src/
│   ├── handlers/
│   │   ├── user/
│   │   │   ├── handler.ts
│   │   │   └── user.service.ts
│   │   ├── order/
│   │   │   ├── handler.ts
│   │   │   └── order.service.ts
│   │   └── common/
│   │       └── response.ts
│   │
│   ├── entities/
│   │   ├── schema1/
│   │   │   └── User.ts
│   │   └── schema2/
│   │       └── Order.ts
│   │
│   ├── layers/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   └── ormconfig.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── responseHandler.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   └── shared/
│       ├── constants.ts
│       ├── errors.ts
│       └── validations.ts
│
├── layers/
│   ├── db/
│   │   └── nodejs/
│   │       └── src/ (copied from src/layers/db/)
│   └── utils/
│       └── nodejs/
│           └── src/ (copied from src/layers/utils/)
│
├── function/
│   ├── user.yml
│   └── order.yml
│
├── serverless.yml
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## Project structure

See `src/` and `layers/` for code. Layers are copied under `layers/*/nodejs` and are referenced by lambdas via `layers` in `serverless.yml`.

## Notes

- In Lambda, layers are mounted under `/opt` — this project references shared code using absolute imports assuming the layer will be packaged with `nodejs` folder (e.g. `/opt/nodejs/src/`).
- For production, manage DB connections carefully (reuse across invocations) and set `synchronize: false` for TypeORM; use migrations.
