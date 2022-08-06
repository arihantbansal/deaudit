import "dotenv/config";

const PORT = process.env.PORT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

export { PORT, SUPABASE_URL, SUPABASE_API_KEY };
