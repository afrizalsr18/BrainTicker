import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo" />
        <Image
          src="/assets/icons/logo.svg"
          alt="tickerbrain"
          width={140}
          height={32}
          className="h-8 w-auto"
        />
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            TickerBrain has become my go-to for tracking my portfolio—it's fast,
            clean, and incredibly easy to navigate. The real-time updates and
            customizable watchlists keep me informed without overwhelming me
            with clutter. Highly recommend it to anyone.
          </blockquote>
          <div className="flex items-center justify-between">
            <cite className="auth-testimonial-author"> -John Doe</cite>
            <p className="max-md:text-xs text-gray-500">Retail Investor</p>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                src="/assets/icons/star.svg"
                key={star}
                width={20}
                height={20}
                className="w-5 h5"
                alt="stars"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/assets/images/dashboard.png"
            alt="dashboard"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top0"
          ></Image>
        </div>
      </section>
    </main>
  );
};

export default Layout;
