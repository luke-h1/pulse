# server 

> Node.js backend GraphQL API that serves admin and frontend

This server servces traffic on `http://localhost:8000/api/graphql` by default.

# Environment Variables

| Name                   | Description                          | Default                                                           |
| ---------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `ENVIRONMENT`          | 'local' | 'staging' | 'production'   | `local`                                                           |
| `PORT`                 | port that server runs on             | `8000`                                                            |
| `SESSION_SECRET`       | used for signing cookies             | `secretcat`                                                       |
| `REDIS_URL`            | URL for Redis                        | `redis://localhost:6379`                                          |
| `DATABASE_URL`         | URL for Postgres DB                  | `postgresql://pulse:pulse@localhost:5432/pulse?schema=public`     |
| `CLOUDINARY_SECRET`    | Used for accessing Cloudinary API    | ``                                                                |
