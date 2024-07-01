# Serverless Postgres Next.js Handbook

Welcome to the Serverless Postgres Next.js Handbook. Follow these steps to get started:

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tyaga001/serverless-postgres-nextjs-handbook.git

2. Install the project dependencies.
  ```bash
  npm install
  ```
3. Create your .env.local file:

Create a .env.local file in the root directory of the project.

 ```bash
  touch .env.local
  ```

4. Set up Neon database:

Create a [Neon project](https://neon.tech/docs/introduction) and copy your connection string into the `.env.local` file.
  ```bash
  NEON_DATABASE_URL=
  ```
5. Set up Clerk application:

Create a [Clerk application project](https://clerk.com) and copy your credentials into the `.env.local` file.
  ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
  ```
6. Initialize the database:

Execute the command - `npm run db-create` within your terminal.
  
7. Start the Next.js development server:
  ```bash
  npm run dev
  ```
