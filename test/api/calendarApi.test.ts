import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en calendarApi", () => {
  beforeEach(() => jest.clearAllMocks());
  test("debe tener la configuración por defecto", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("debe de tener el x-token en el header de todas las peticiones", async () => {
    localStorage.setItem("token", "tokenString");

    try {
      const res = await calendarApi.get("/auth");
      expect(res.config.headers["x-token"]).toBe(localStorage.getItem("token"));
    } catch (error: any) {
      expect(error.response.config.headers["x-token"]).toBe(
        localStorage.getItem("token")
      );
    }
  });
});
