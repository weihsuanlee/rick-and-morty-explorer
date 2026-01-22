import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <div className="rm-bounce-ball" aria-hidden="true" />
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-default-500">
          404
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">
          Lost in another{" "}
          <span className="gradient-text animate-gradient">dimension</span>
        </h1>
        <p className="text-sm text-default-500">
          We could not find the page you are looking for.
        </p>
      </div>
      <Link
        className="rounded-full border border-default-200 px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary"
        href="/"
      >
        Return to Explorer
      </Link>
    </main>
  );
}
