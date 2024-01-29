import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { getSearch } from "@/lib/search-service";
import { Suspense } from "react";

interface SearchPageProps {
	searchParams: {
		term?: string;
	};
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	if (!searchParams.term) redirect("/");

	return (
		<div className="h-full p-8 max-w-screen-2xl mx-auto">
			<Results term={searchParams.term} />
		</div>
	);
}
