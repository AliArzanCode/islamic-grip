
import Link from "next/link";
export default function ComingSoonCard() {
	return (
		<section className="relative mx-4 mb-2 mt-2 overflow-hidden rounded-3xl border border-emerald-200/40 bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-6 shadow-[0_14px_40px_-20px_rgba(5,150,105,0.5)] sm:mx-5 sm:p-8 md:mx-6 md:p-10">
			<div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-300/40 blur-2xl" />
			<div className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-lime-300/40 blur-2xl" />

			<div className="relative flex flex-col gap-4 text-emerald-950">
				<p className="w-fit rounded-full border border-emerald-300/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
					Update
				</p>

				<h3 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
					You can check out Library Section
				</h3>

				<p className="max-w-2xl text-sm leading-7 text-emerald-900/85 sm:text-base">
					We prepared a Library Section where you can read books like Hadith , Books written by ayatullah's and many more
				</p>
  <Link
      href="/library"
      className="inline-flex w-24 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#dff7c6] to-[#c9f5d2] px-6 py-3 text-[#013c3f] font-semibold shadow-md transition-all border border-emerald-200 hover:scale-105 hover:shadow-lg"
    >
      
      Library
    </Link>
			</div>
		</section>
	);
}
