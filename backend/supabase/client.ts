import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_API_KEY } from "../utils/config";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
