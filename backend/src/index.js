import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.status(400).json({ error: 'Missing query param q' });
  }

  const { data, error } = await supabase
    .from('price_history')
    .select('id, game_name, retailer, price, stock_status, url, scraped_at')
    .ilike('game_name', `%${query}%`)
    .order('scraped_at', { ascending: false })
    .limit(50);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ query, results: data });
});

app.get('/recent', async (req, res) => {
  const { data, error } = await supabase
    .from('price_history')
    .select('id, game_name, retailer, price, stock_status, url, scraped_at')
    .order('scraped_at', { ascending: false })
    .limit(50);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ results: data });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
