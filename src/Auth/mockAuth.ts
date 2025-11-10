type User = { username: string; role: string; name?: string };

const demoUsers: Record<string, { password: string; role: string; name: string }> = {
  "admin@demo.edu": { password: "AdminPass123!", role: "admin", name: "Admin One" },
  "student@demo.edu": { password: "Student123!", role: "user", name: "Student One" }
};

export function login(username: string, password: string): User | null {
  const record = demoUsers[username];
  if (record && record.password === password) {
    const user = { username, role: record.role, name: record.name };
    localStorage.setItem("demo_user", JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("demo_user");
}

export function currentUser(): User | null {
  const raw = localStorage.getItem("demo_user");
  return raw ? JSON.parse(raw) as User : null;
}

export function requireAuthOrRedirect(router: any) {
  if (!currentUser()) router.push("/");
}
