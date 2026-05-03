import dotenv from 'dotenv';
import { scrapeKtronix } from './ktronix-scraper.js';
import { supabase } from './supabaseClient.js';

dotenv.config();

const query = process.argv.slice(2).join(' ');
if (!query) {
  console.error('Usage: npm run scrape -- --query "elden ring"');
  process.exit(1);
}

async function run() {
  console.log(`Scraping Ktronix for query: ${query}`);
  const result = await scrapeKtronix(query);

  if (!result) {
    console.log('No result found for the query.');
    return;
  }

  const { data, error } = await supabase.from('price_history').insert([{
    game_name: result.game_name,
    retailer: result.retailer,
    price: result.price,
    stock_status: result.stock_status,
    url: result.url,
  }]);

  if (error) {
    console.error('Supabase insert failed:', error.message);
    process.exit(1);
  }

  console.log('Saved price snapshot:', data[0]);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
