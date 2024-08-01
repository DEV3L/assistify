const SERVER_ROUTE = "http://localhost:8000"

export const fetchRandomNumber = async (): Promise<string> => {
    const response = await fetch(`${SERVER_ROUTE}/random-number`);
    const data = await response.json();
    return data.message;
  };
