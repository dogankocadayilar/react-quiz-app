import axios from "axios";
import { useEffect, useState } from "react";
import { parseData } from "../helpers/helpers";

function useFetch(isPlayAgainPressed) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) =>
        setData(() => {
          return response.data.results.map((result) => parseData(result));
        })
      )
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [isPlayAgainPressed]);

  return [data, setData, loading, error];
}

export default useFetch;
