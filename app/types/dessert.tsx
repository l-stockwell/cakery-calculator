import { Modifiers } from "../data/modifiers";

export interface FinalDessert {
  volume: number;
  taste: number;
  aroma: number;
  price: number;
  sweet: number;
  texture: number;
  temp: number;
  totalCals: number;
  totalAllowedCals: number;
  colors: string[];
  modifiers: Modifiers | null;
  finalSweetness: string;
  finalTexture: string;
  overCalorieLimit: boolean;
}
