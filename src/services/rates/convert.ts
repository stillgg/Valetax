import { instance } from "@/services/instance";
import { rateSchema } from "@/types/schemas/rate";

export default async (from: string, to: string, amount: string) => {
  const date = new Date().toISOString().slice(0, 10);

  const response = await instance
    .get(
      `convert?from=${from}&to=${to}&date=${date}&amount=${amount}&format=json&api_key=fxr_live_e80e2cd45d2b788468a084f1e44a733265ff"`
    )
    .json();

  return rateSchema.parse(response);
};
