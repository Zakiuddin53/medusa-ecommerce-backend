import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const searchService = req.scope.resolve("searchService");

  const { q } = req.query;

  if (typeof q !== "string") {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const result = await searchService.search(q, {});
    return res.json(result);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Error performing search" });
  }
}
