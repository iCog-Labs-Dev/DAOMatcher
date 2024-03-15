import IUser from "@/types/IUser";
import { json2csv } from "json-2-csv";

export async function convertToCSV(jsonData: IUser[]) {
  try {
    const csv = await json2csv(jsonData);
    return csv;
  } catch (err) {
    console.error("Error converting JSON to CSV:", err);
    return null;
  }
}
