"use client";

import { desserts } from "../data/bases";
import { syrups, toppings } from "../data/ingredients";
import { Modifiers } from "../data/modifiers";
import { FinalDessert } from "../types/dessert";

export function calculateFinalResult(
    base: string,
    baseLevel: number,
    ingredientObjects: { id: string, level: number }[],
    syrupObjects: { id: string, level: number }[],
    modifiers?: Modifiers,
): FinalDessert {
    const finalDessert: FinalDessert = initializeFinalDessert();

    // Collect base dessert values
    const baseDessert = desserts.find((d) => d.id === base);
    if (baseDessert) {
        updateDessertValues(finalDessert, baseDessert);
        finalDessert.totalAllowedCals = calculateCalorieLimit(baseDessert, baseLevel);
    }

    // Collect all ingredient and syrup IDs
    const ingredientIds = ingredientObjects.map((ingredient) => ingredient.id);
    const syrupIds = syrupObjects.map((syrup) => syrup.id);

    // Create a combined list of selected syrups and toppings
    const selectedDesserts = getSelectedDesserts(ingredientIds, syrupIds);

    // Calculate properties for the selected desserts
    selectedDesserts.forEach((item) => {
        const dessert = [...syrups, ...toppings].find((d) => d.id === item.id);
        const ingredientObject = ingredientObjects.find(i => i.id === item.id);
        const syrupObject = syrupObjects.find(s => s.id === item.id);

        if (dessert) {
            updateDessertValues(finalDessert, dessert);
            finalDessert.totalCals += dessert.calories + calculateAdditionalCalories(ingredientObject, syrupObject);
        }
    });

    // Check calorie limits
    if (baseDessert && finalDessert.totalCals > finalDessert.totalAllowedCals) {
        finalDessert.overCalorieLimit = true;
    }

    // Adjust texture based on modifiers
    if (modifiers === Modifiers.TextureUp) {
        finalDessert.texture += 2 + ingredientObjects.length; // Add 1 texture per ingredient
    }

    // Set final texture and sweetness
    finalDessert.finalTexture = determineFinalTexture(finalDessert.texture);
    finalDessert.finalSweetness = determineFinalSweetness(finalDessert.sweet);

    return finalDessert;
}

// Helper functions
function initializeFinalDessert(): FinalDessert {
    return {
        volume: 0,
        taste: 0,
        aroma: 0,
        price: 0,
        sweet: 0,
        temp: 0,
        texture: 3, // base texture
        totalCals: 0,
        totalAllowedCals: 0,
        modifiers: null,
        finalSweetness: "",
        finalTexture: "",
        colors: [],
        overCalorieLimit: false,
    };
}

function updateDessertValues(finalDessert: FinalDessert, dessert: any) {
    finalDessert.volume += dessert.volume;
    finalDessert.taste += dessert.taste;
    finalDessert.aroma += dessert.aroma;
    finalDessert.price += dessert.price;
    finalDessert.sweet += dessert.sweetness;
    finalDessert.temp += dessert.temperature;
    finalDessert.texture += dessert.texture;
    finalDessert.totalCals += dessert.calories;

    if (!finalDessert.colors.includes(dessert.colour)) {
        finalDessert.colors.push(dessert.colour);
    }
}

function calculateCalorieLimit(baseDessert: any, baseLevel: number): number {
    return baseDessert.maxCalories + (baseLevel - 1) * 17;
}

function getSelectedDesserts(ingredientIds: string[], syrupIds: string[]) {
    return [
        ...syrups.filter((syrup) => syrupIds.includes(syrup.id)),
        ...toppings.filter((topping) => ingredientIds.includes(topping.id)),
    ];
}

function calculateAdditionalCalories(ingredientObject?: { level: number }, syrupObject?: { level: number }): number {
    const ingredientCalories = ingredientObject ? 2 * ingredientObject.level : 0;
    const syrupCalories = syrupObject ? 2 * syrupObject.level : 0;
    return ingredientCalories + syrupCalories;
}

function determineFinalTexture(texture: number): string {
    if (texture <= 2) return "Velvety";
    if (texture >= 3 && texture <= 5) return "Moist";
    return "Light";
}

function determineFinalSweetness(sweet: number): string {
    if (sweet <= 2) return "Semi Sweet";
    if (sweet >= 3 && sweet <= 5) return "Sweet";
    return "Very Sweet";
}