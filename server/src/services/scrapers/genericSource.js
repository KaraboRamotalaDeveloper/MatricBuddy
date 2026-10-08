import axios from "axios";
import * as cheerio from "cheerio";
export const discoverLinks = async (sourceUrl) => {
  const { data: html } = await axios.get(sourceUrl, {
    timeout: 15000,
    headers: { "User-Agent": "MatricBuddy/1.0 educational metadata importer" },
  });
  const $ = cheerio.load(html);
  const results = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();
    if (!href || !text) return;
    const url = new URL(href, sourceUrl).href;
    if (/\.pdf($|\?)/i.test(url) || /paper|exam|matric|grade.?12/i.test(text))
      results.push({ title: text.replace(/\s+/g, " "), url });
  });
  return [...new Map(results.map((x) => [x.url, x])).values()];
};
