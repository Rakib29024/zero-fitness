import {createClient} from '@supabase/supabase-js';

const supabaseUrl = "https://pwlbbqxxxschcnxockcb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bGJicXh4eHNjaGNueG9ja2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3ODE0MTEsImV4cCI6MjAyMjM1NzQxMX0.dkpiahb2VbY7j-tGNsE1eRtqvGY3kKCPFV8V1Gy-VVw";

export const supabase = createClient(supabaseUrl,supabaseKey);