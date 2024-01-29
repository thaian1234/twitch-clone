"use client";

import { getSearch } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { useEffect, useState } from "react";
import { Stream, User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface ResultsProps {
	term?: string;
}

type DataType = Stream & { user: User };

export function Results({ term }: ResultsProps) {
	// const [data, setData] = useState<DataType[]>([]);
	// const [isLoading, setIsLoading] = useState(false);
	// // const data = await getSearch(term);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setIsLoading(true);
	// 		const resp = await getSearch(term);

	// 		setData(resp);
	// 		setIsLoading(false);
	// 	};

	// 	fetchData();
	// }, [term]);

	// if (isLoading || !data) return <ResultsSkeleton />;
	const { data, isPending } = useQuery<DataType[]>({
		queryKey: ["term", term],
		queryFn: () => getSearch(term),
	});

	if (!data || isPending) return <ResultsSkeleton />;

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">
				Results for term &quot;{term}&quot;
			</h2>
			{data.length === 0 && (
				<p className="text-muted-foreground text-sm">
					No results found. Try searching for something else
				</p>
			)}
			<div className="flex flex-col gap-y-4">
				{data.map((result) => (
					<ResultCard data={result} key={result.id} />
				))}
			</div>
		</div>
	);
}

export function ResultsSkeleton() {
	return (
		<div>
			<Skeleton className="h-8 w-[200px] mb-4" />
			<div className="flex flex-col gap-y-4">
				{[...Array(4)].map((_, i) => (
					<ResultCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
