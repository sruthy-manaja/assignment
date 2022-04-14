import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Supermetrics Assignment</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Post</Link>
          </li>
          <li>
            <Link href='/dashboard'>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
