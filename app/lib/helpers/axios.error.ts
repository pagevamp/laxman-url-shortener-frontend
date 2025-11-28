import axios from "axios";

export function getAxiosErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? "Axios error";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
}
