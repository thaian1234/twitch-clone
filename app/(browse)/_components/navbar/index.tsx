import { Suspense } from "react";
import { Actions, LoadingSpinnerButton } from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

export function Navbar() {
	return (
		<nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
			<Logo />
			<Search />
			<Suspense fallback={<LoadingSpinnerButton />}>
				<Actions />
			</Suspense>
		</nav>
	);
}
