"use client";

import { useState, use, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";

interface SearchParamsProps {
  searchParams: Promise<{
    client_id?: string;
    redirect_uri?: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    scope?: string;
  }>;
}

export default function McpAuthorizePage({ searchParams }: SearchParamsProps) {
  const params = use(searchParams);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = params.client_id || "AI Agent (Claude / LLM Client)";
  const redirectUri = params.redirect_uri || "";
  const state = params.state || "";
  const codeChallenge = params.code_challenge || "";
  const codeChallengeMethod = params.code_challenge_method || "S256";

  async function handleAuthorize(e: FormEvent) {
    e.preventDefault();
    if (!password) {
      setError("Please enter the security password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/mcp/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          client_id: clientId,
          redirect_uri: redirectUri,
          state,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        setError(data.error || "Incorrect password. Authorization failed.");
        setLoading(false);
        return;
      }

      // Redirect back to the LLM client (Claude, etc.)
      window.location.href = data.redirectUrl;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block mb-4">
          <Logo size="lg" theme="light" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          Authorize AI Agent Connection
        </h1>
        <p className="mt-2 text-xs font-mono text-ink-muted">
          Model Context Protocol &middot; Security Gate
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="paper-card rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-lg">
          <div className="rounded-xl border border-brass/30 bg-brass-soft/30 p-4 mb-6 text-xs text-ink/85">
            <div className="flex items-center gap-2 font-bold text-navy uppercase font-mono text-[11px]">
              <ShieldCheck className="h-4 w-4 text-brass" />
              <span>Permission Request</span>
            </div>
            <p className="mt-1.5 leading-relaxed text-ink-muted">
              An AI Agent (<strong>{clientId}</strong>) is requesting write &amp; management access to Attire Services content.
            </p>
          </div>

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                Enter Admin Security Password
              </label>
              <div className="mt-1.5 relative rounded-md shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-ink-muted" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="block w-full rounded-md border border-line bg-canvas pl-10 pr-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-navy focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-navy-soft disabled:opacity-50 transition-all"
              >
                <span>{loading ? "Verifying..." : "Authorize & Connect Agent"}</span>
                <ArrowRight className="h-4 w-4 text-brass-light" />
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-line-subtle pt-4 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-ink-muted hover:text-ink underline"
            >
              Cancel and return to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
