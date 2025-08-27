// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
import { neon } from '@neondatabase/serverless';
export async function handler(event) {
  const sql = neon(process.env.NETLIFY_DATABASE_URL);
  try {
    const rows = await sql`SELECT * FROM accounts;`;
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}