const sampleCredentials = {
  username: "admin",
  password: "123123",
  name: "John Doe",
  role: "Administrator",
  permissions: [],
  suppliers: [],
  companies: [],
};

const encodeBase64Url = (value) =>
  Buffer.from(JSON.stringify(value))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const createMockToken = (user) => {
  const header = encodeBase64Url({ alg: "none", typ: "JWT" });
  const payload = encodeBase64Url({
    username: user.username,
    sub: user.username,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    suppliers: user.suppliers,
    companies: user.companies,
    iat: Math.floor(Date.now() / 1000),
  });

  return `${header}.${payload}.mock-signature`;
};

export async function POST(request) {
  const { username, password } = await request.json();

  if (
    username !== sampleCredentials.username ||
    password !== sampleCredentials.password
  ) {
    return Response.json(
      { username: "Invalid demo credentials" },
      { status: 401 },
    );
  }

  return Response.json({
    token: createMockToken(sampleCredentials),
    name: sampleCredentials.name,
    role: sampleCredentials.role,
    permissions: [],
    suppliers: [],
    companies: [],
  });
}
