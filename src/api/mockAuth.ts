export const mockLogin = async (
  username: string,
  password: string
): Promise<{ status: number; token?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // simulate delay

  if (username === "user" && password === "pass") {
    return { status: 200, token: "mock-jwt-token" };
  } else if (username === "user") {
    return { status: 400 };
  } else {
    return { status: 500 };
  }
};
