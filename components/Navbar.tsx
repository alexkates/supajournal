import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/journal" className="btn btn-ghost text-xl">
          <div>
            <span className="text-secondary">supa</span>
            <span>journal</span>
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/journal">Journals</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
