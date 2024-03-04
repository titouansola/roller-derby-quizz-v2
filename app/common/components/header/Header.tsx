import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { IsAdmin } from "../auth/IsAdmin";

export function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Roller Derby Quizz</div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to={"/"}>Home</Link>
          <Link to={"/test-my-skills"}>Test my skills</Link>
          <IsAdmin>
            <Link to={"/admin"}>Admin</Link>
          </IsAdmin>
        </nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
