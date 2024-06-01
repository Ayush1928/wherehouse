import { Titillium_Web } from "next/font/google";
import { Roboto } from "next/font/google";

export const titilliumWeb = Titillium_Web({ weight: ["200", "300", "400", "600", "700", "900"], subsets: ["latin"] });
export const roboto = Roboto({ weight: ["300", "400", "700", "900", "100", "500"], subsets: ["latin"] });