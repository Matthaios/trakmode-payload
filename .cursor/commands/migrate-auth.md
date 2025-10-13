Generate auth schema.

```bash
bun run auth:generate
```



Generate and migrate the auth database.



```bash
bun run db:auth:generate
```

If new fields have been added, you need to run the following command to migrate the database.

```bash
bun run db:auth:migrate
```
