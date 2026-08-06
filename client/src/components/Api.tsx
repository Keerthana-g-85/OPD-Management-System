import axios from "axios";

interface Value {
  query?: string;
}
export default async function useApi(values: Value) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:3040/graphql",
    {
      query: values.query,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}
