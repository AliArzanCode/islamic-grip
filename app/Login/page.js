
"use client";

import Image from "next/image";
import Link from "next/link";

import "./page.css";
import { signIn } from "next-auth/react"


const Page = () => {
    return (
        <main className="login-shell">
            <div className="login-ambient login-ambient-one" />
            <div className="login-ambient login-ambient-two" />

            <section className="login-grid">
                <aside className="brand-panel">
                    <Image src="/logo.png" alt="Islamic Grip logo" width={64} height={64} className="brand-logo" />
                    <p className="brand-kicker">ISLAMIC GRIP</p>
                    <h1>Welcome back</h1>
                    <p className="brand-copy">
                        Continue your journey with Quran reflections, prayer tools, and a
                        peaceful daily experience built for consistency.
                    </p>

                    <ul className="brand-points">
                        <li>Track daily salah timings with fewer distractions</li>
                        <li>Get quick access to saved verses and notes</li>
                        <li>Pick up right where you left off on any device</li>
                    </ul>
                </aside>

                <section className="login-card">
                    <div className="login-card-head">
                        <h2>Sign in to your account</h2>
                        <p>Choose a social login to continue.</p>
                    </div>

                    <div className="divider">Or continue with</div>

                    <div className="social-grid">
                        <button className="social-btn" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
                            <span>G</span>
                            Google
                        </button>
                        <button className="social-btn" type="button" onClick={() => signIn("facebook", { callbackUrl: "/" })}>
                            <span>f</span>
                            Facebook
                        </button>
                        <button className="social-btn" type="button" onClick={() => signIn("twitter", { callbackUrl: "/" })}>
                            <span>X</span>
                            Twitter
                        </button>
                    </div>

                   
                </section>
            </section>
        </main>
    );
};

export default Page;
