export const fetchRandomNumber = async (): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/random-number`);
    const data = await response.json();
    return data.message;
  };
