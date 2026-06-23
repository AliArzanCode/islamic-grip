import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { supabase } from "@/lib/supabase";
import { nextAuthOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { books as nahjulBooks } from "@/data/book";

export default async function LibraryPage() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	const session = await getServerSession(nextAuthOptions);
	const getReadHref = (pdfUrl) => {
		if (!pdfUrl) {
			return "/Login";
		}

		return session ? pdfUrl : `/Login?callbackUrl=${encodeURIComponent(pdfUrl)}`;
	};
	const getReadTarget = session ? "_blank" : undefined;
	const getReadRel = session ? "noopener noreferrer" : undefined;

	if (!supabaseUrl || !supabaseAnonKey) {
		return (
			<div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
				<h1 className="text-xl font-semibold">Library is not configured yet</h1>
				<p className="mt-2 text-sm">
					Add <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span> and <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> to your environment so the books list can load.
				</p>
			</div>
		);
	}

	const { data: books = [], error } = await supabase.from("books").select("*");
	const { data: books_khamenei = [], error: khameneiError } = await supabase.from("books_khamenei").select("*");

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
				<h1 className="text-xl font-semibold">Library could not load</h1>
				<p className="mt-2 text-sm">{error.message}</p>
			</div>
		);
	}

	if (khameneiError) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
				<h1 className="text-xl font-semibold">Books by Ayatullah Sayyid Ali Khamenei could not load</h1>
				<p className="mt-2 text-sm">{khameneiError.message}</p>
			</div>
		);
	}

	return (
        <>
		<Navbar/>

        <div><h1 className="text-4xl font-bold text-center p-5">Library</h1></div>
			{!session ? (
				<div className="mx-auto mb-6 max-w-2xl rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-center text-amber-950 shadow-sm">
					<h2 className="text-lg font-semibold">Login first to read books</h2>
					<p className="mt-1 text-sm">
						Sign in to open any book or card and continue reading in your account.
					</p>
					<a
						href="/Login"
						className="mt-3 inline-flex rounded-full bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
					>
						Go to Login
					</a>
				</div>
			) : null}
			<div className="card relative flex flex-col gap-4 p-4  text-white md:h-90 md:flex-row md:p-5">

			 {nahjulBooks.map((book) => (
			<a
			  key={book.id}
          href={getReadHref(book.pdf)}
					target={getReadTarget}
					rel={getReadRel}
          className="Nahjul-block relative w-full overflow-hidden rounded-2xl
 
  bg-gradient-to-br
  from-[#1d2b1f]
  via-[#274228]
  to-[#0f1f1b]
  shadow-[0_20px_60px_rgba(16,185,129,0.25)] border border-white/10  p-8 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:w-1/2 md:p-5"><div className="flex h-full items-center gap-3 sm:gap-4">
	<div className="flex  items-center justify-center  p-2">
					<Image src="/NAHJUL-BALAGAH79a-Copy.jpg" alt="Nahjul-Balagah" width={100}
							height={200} className="rounded mx-auto"/></div>
							 <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 sm:text-xs sm:tracking-[0.25em]">Nahjul-Balagha</p>
              <h3 className="mt-1 text-lg font-bold text-white sm:mt-2 sm:text-xl md:text-2xl">Read Nahjul-Balagha</h3>
              <p className="mt-2 max-w-xs text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">
                Tap this card to read Nahjul-Balagha
              </p>
			  <p className=" max-w-xs text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">Complied By Allama Syed Razi</p>
              
            </div>
							</div>
						</a>
 ))}
			<div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-4 text-left shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:w-1/2 md:p-5">
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-[url('/ayatullah_1.jpg')] bg-cover bg-center blur-[1px] scale-105"
				/>
				<div className="absolute inset-0 bg-black/25" />
				<div className="relative z-10">
				<h1 className="mx-auto w-fit rounded-xl border bg-gradient-to-r  bg-white/10 px-4 py-2 text-center text-lg font-semibold  text-white shadow-sm">
					Books by Ayatullah Sayyid Ali Khamenei


		  </h1>
		  <div className="grid grid-cols-2 gap-4  text-center rounded md:grid-cols-4">
		  	{books_khamenei.length ? books_khamenei.map((books) => (
				<a
					key={books.id}
					href={getReadHref(books.pdf_url)}
					target={getReadTarget}
					rel={getReadRel}
					className="flex flex-col items-center rounded p-4 text-center transition-transform duration-300 hover:-translate-y-1"
				>
					{books.cover_url ? (
						<Image
							src={books.cover_url}
							alt={books.title}
							width={80}
							height={100}
							className="mx-auto rounded"
						/>
					) : (
						<div className="mx-auto flex h-[200px] w-[100px] items-center justify-center rounded bg-black/40 px-2 text-center text-xs text-white/80">
							No cover image
						</div>
					)}
					<span className="mt-2 inline-flex w-[100px] items-center justify-center rounded bg-yellow-800 px-2 py-1 text-xs text-white">
						Read Book
					</span>
					
				</a>
			)) : (
				<p className="mt-4 rounded border border-white/20 bg-black/30 p-3 text-sm text-white/90">
					No Khamenei books were returned from the table.
				</p>
			)}
		
		  
		  </div>
		  </div>
		  </div>
		</div>
		<div className="grid grid-cols-2 gap-4 border border-emerald-200 p-3 bg-emerald-100 rounded md:grid-cols-4">


			{books.length ? books.map((book) => (
				<a
					key={book.id}
					href={getReadHref(book.pdf_url)}
					target={getReadTarget}
					rel={getReadRel}
					className="flex flex-col items-center rounded p-4 text-center transition-transform duration-300 hover:-translate-y-1"
				>
					{book.cover_url ? (
						<Image
							src={book.cover_url}
							alt={book.title}
							width={100}
							height={200}
							className="mx-auto rounded"
						/>
					) : (
						<div className="mx-auto flex h-[200px] w-[100px] items-center justify-center rounded bg-emerald-200 px-2 text-center text-xs text-emerald-950">
							No cover image
						</div>
					)}
					<span className="mt-2 inline-flex w-[100px] items-center justify-center rounded bg-green-600 px-2 py-1 text-xs text-white">
						Read Book
					</span>
					<h2 className="mt-2 font-semibold text-center">{book.title}</h2>
				</a>
			)) : (
				<div className="col-span-full rounded border border-dashed border-emerald-300 bg-white p-4 text-sm text-gray-700">
					Books have to be added yet.
				</div>
			)}
		</div>
        </>
	);
}