import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <form action={loginAction}>
      <input name="username" type="text" placeholder="Usuario" />
      <input name="password" type="password" placeholder="Contraseña" />
      <button type="submit">Entrar</button>
    </form>
  );
}
