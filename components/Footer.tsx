import Link from 'next/link';
import { SITE_TITLE, AUTHOR } from '@lib/constants';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="brand">
          <img src="/supermetrics-icon.svg" alt="Supermetrics Icon" />
          <span>{SITE_TITLE}</span>
        </div>
        Made by{' '}
        <Link href={AUTHOR.socials.linkedin}>
          <a target="_blank">{AUTHOR.name}</a>
        </Link>
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          padding: 30px 0;
          border-top: 1px solid #eaeaea;
          text-align: center;
        }

        footer .brand {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        footer .brand img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      `}</style>
    </>
  );
}
