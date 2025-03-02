"use client";

import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Grid, Stack, Button, Text, MultiSelect, Select, Title, NumberInput, Group } from "@mantine/core";
import { desserts } from "../data/bases";
import { syrups, toppings } from "../data/ingredients";
import { Modifiers } from "../data/modifiers";
import { calculateFinalResult } from "../util/sweetProcessor";
import { FinalDessert } from "../types/dessert";
import Image from 'next/image';
import Link from 'next/link';

type IngredientLevels = {
  [key: string]: number;
};

const initialValues = {
  bases: [],
  baseLevel: 1,
  toppings: [],
  syrups: [],
  modifiers: [],
  toppingLevels: {} as IngredientLevels,
  syrupLevels: {} as IngredientLevels,
};

const Calculator: React.FC = () => {
  const form = useForm({ initialValues });
  const [result, setResult] = useState<FinalDessert | null>(null);

  const handleSubmit = (values: any) => {
    const ingredientObjects = values.toppings.map((id: string) => ({
      id,
      level: values.toppingLevels[id] || 1,
    }));
    const syrupObjects = values.syrups.map((id: string) => ({
      id,
      level: values.syrupLevels[id] || 1,
    }));

    const result = calculateFinalResult(
      values.bases,
      values.baseLevel,
      ingredientObjects,
      syrupObjects,
      values.modifiers,
    );
    setResult(result);
  };

  const renderIngredientLevels = (ingredientType: 'toppings' | 'syrups') => {
    const ingredientData = ingredientType === 'toppings' ? toppings : syrups;
    const levels = ingredientType === 'toppings' ? form.values.toppingLevels : form.values.syrupLevels;

    if (form.values[ingredientType].length > 0) {
      return (
        <Group>
          <Title order={3}>Select {ingredientType ==  'toppings' ? 'Topping' : 'Syrup'} Ingredient Levels</Title>
          <Grid grow>
            {form.values[ingredientType].map((id: string) => {
              const level = levels[id] ?? 1;
              const ingredient = ingredientData.find((item) => item.id === id);

              return (
                <Grid.Col span={6} key={id}>
                  <NumberInput
                    label={ingredient?.name}
                    value={level}
                    onChange={(value) => {
                      form.setFieldValue(`${ingredientType}Levels`, {
                        ...levels,
                        [id]: Number(value),
                      });
                    }}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Group>
      );
    }
    return null;
  };

  return (
    <Grid className="app-grid">
      <Grid.Col span={6}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group grow>
              <Select
                label="Select Base"
                placeholder="Choose one"
                withAsterisk
                data={desserts.map(({ id, name }) => ({ value: id, label: name })).sort((a, b) => a.label.localeCompare(b.label))}
                {...form.getInputProps("bases")}
              />
              <NumberInput
                label="Select Base Level"
                {...form.getInputProps("baseLevel")}
              />
            </Group>
            <MultiSelect
              label="Select Toppings"
              placeholder="Choose one"
              searchable
              data={toppings.map(({ id, name }) => ({ value: id, label: name })).sort((a, b) => a.label.localeCompare(b.label))}
              {...form.getInputProps("toppings")}
            />
            {renderIngredientLevels('toppings')}
            <MultiSelect
              label="Select Syrups"
              placeholder="Choose one"
              searchable
              data={syrups.map(({ id, name }) => ({ value: id, label: name })).sort((a, b) => a.label.localeCompare(b.label))}
              {...form.getInputProps("syrups")}
            />
            {renderIngredientLevels('syrups')}
            <Select
              label="Select Modifier"
              placeholder="Choose one"
              data={[
                { value: Modifiers.TextureUp, label: Modifiers.TextureUp },
                { value: Modifiers.None, label: Modifiers.None },
              ]}
              {...form.getInputProps("modifiers")}
            />
            <Button type="submit" color="pink" radius="10">
              Calculate
            </Button>
            <Stack mt="lg" align="center">
            <Text size="sm" style={{ color: 'grey' }}>
              This tool was developed to assist in creating recipes for BonBon Cakery, using data available on the{' '}
              <Link href="https://kairosoft.wiki.gg/wiki/Ingredients_(Bonbon_Cakery)">
                Ingredients Wiki
              </Link>. 
              Please note that modifiers are still under development due to limited data, so consider them as rough estimates for now.
            </Text>
            </Stack>
          </Stack>
        </form>
      </Grid.Col>
      <Grid.Col span={6} style={{ display: "flex", justifyContent: "center" }}>
        {result && (
          <Stack mt="lg" align="center">
            <Title order={2}>Results:</Title>
            <Text size="xl">{`Sweetness: ${result.finalSweetness} (${result.sweet})`}</Text>
            <Text size="xl">{`Texture: ${result.finalTexture} (${result.texture})`}</Text>
            <Text size="xl" mb="lg">{`Calories: ${result.totalCals}`}</Text>
            {result.overCalorieLimit && (
              <Stack mt="lg" align="center">
                <Text className="warning">This dessert might be over the calorie limit.</Text>
                <Text>Total allowed calories: {result.totalAllowedCals}</Text>
              </Stack>
            )}
          <Image src="/recipe_girl.png" alt="Recipe Girl"  width={200} height={193}/>
          </Stack>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Calculator;