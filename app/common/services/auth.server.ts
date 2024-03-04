import { getAuth } from "@clerk/remix/ssr.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";

export async function checkAuth(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const auth = await getAuth(args);
  if (!auth.userId) {
    return redirect("/sign-in");
  }
  return auth;
}
