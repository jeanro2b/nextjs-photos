import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Photos en Next.Js</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Toutes les photos</Link>
          </li>
          <li>
            <Link href="/new-meetup">Ajouter une nouvelle photo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
