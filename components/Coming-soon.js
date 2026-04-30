export default function ComingSoonCard() {
	return (
		<section className="relative mx-4 mb-2 mt-2 overflow-hidden rounded-3xl border border-emerald-200/40 bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-6 shadow-[0_14px_40px_-20px_rgba(5,150,105,0.5)] sm:mx-5 sm:p-8 md:mx-6 md:p-10">
			<div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-300/40 blur-2xl" />
			<div className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-lime-300/40 blur-2xl" />

			<div className="relative flex flex-col gap-4 text-emerald-950">
				<p className="w-fit rounded-full border border-emerald-300/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
					Next Update
				</p>

				<h3 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
					More resources are coming soon
				</h3>

				<p className="max-w-2xl text-sm leading-7 text-emerald-900/85 sm:text-base">
					We are preparing more Islamic tools, study materials, and daily-practice features to help you learn and stay connected.
				</p>
			</div>
		</section>
	);
}
