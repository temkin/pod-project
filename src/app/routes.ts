const ROUTES = Object.freeze({
  HOME: "/",
  SCAN: "/scan",
  SIGNED_CODES_HISTORY: "/history",
  SIGNATURE_CODE: (code: string) => `/signature/${code}`,
});

export default ROUTES;
