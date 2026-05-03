import playwright from 'playwright-extra';
import StealthPlugin from 'playwright-extra-plugin-stealth';

const stealth = StealthPlugin();
playwright.use(stealth);

export async function scrapeKtronix(query) {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = `https://www.ktronix.com/buscar?query=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

  const item = await page.locator('.product-card').first();
  const exists = await item.count();
  if (!exists) {
    await browser.close();
    return null;
  }

  const title = await item.locator('.product-card__title').innerText().catch(() => query);
  const priceText = await item.locator('.product-card__price').innerText().catch(() => '0');
  const link = await item.locator('a').first().getAttribute('href');
  const stock = await item.locator('.product-card__availability').innerText().catch(() => 'Disponibilidad desconocida');

  const normalizedPrice = Number(priceText.replace(/[^0-9]/g, '')) || 0;
  const stockStatus = /disponible|stock/i.test(stock);

  await browser.close();

  return {
    retailer: 'Ktronix',
    game_name: title.trim(),
    price: normalizedPrice,
    stock_status: stockStatus,
    url: link ? `https://www.ktronix.com${link}` : searchUrl,
  };
}
