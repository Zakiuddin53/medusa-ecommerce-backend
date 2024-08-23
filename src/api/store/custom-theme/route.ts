import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { CustomTheme } from "../../../models/custom-theme";
import { v4 as uuidv4 } from "uuid";

interface ColorThemeRequest {
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    headerFooter: string;
    background: string;
    foreground: string;
    cardBackground: string;
    cardForeground: string;
  };
}

export const POST = async (
  req: MedusaRequest<ColorThemeRequest>,
  res: MedusaResponse
) => {
  try {
    const { colorTheme } = req.body;

    const manager: EntityManager = req.scope.resolve("manager");

    const customThemeRepository = manager.getRepository(CustomTheme);

    const newTheme = customThemeRepository.create({
      id: uuidv4(),
      colors: colorTheme,
    });
    const savedTheme = await customThemeRepository.save(newTheme);

    console.log("Saved theme", savedTheme);

    res.status(200).json({ success: true, theme: savedTheme });
  } catch (error) {
    console.error("Error saving theme:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");

  const customThemeRepository = manager.getRepository(CustomTheme);

  const themes = await customThemeRepository.find();

  res.status(200).json({ themes });
};
