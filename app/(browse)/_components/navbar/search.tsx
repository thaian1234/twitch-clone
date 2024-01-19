"use client";

import qs from "query-string";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { delay } from "@/lib/delay";

interface SearchInput {
	value: string;
}

export function Search() {
	const router = useRouter();
	// const [value, setValue] = useState("");
	const { register, handleSubmit, reset, getFieldState, formState } =
		useForm<SearchInput>({
			mode: "onChange",
			defaultValues: {
				value: "",
			},
		});
	const { isSubmitting } = formState;

	getFieldState("value", formState);

	const onSubmit = (data: SearchInput) => {
		if (!data.value) return;

		const url = qs.stringifyUrl(
			{
				url: "/search",
				query: {
					term: data.value,
				},
			},
			{
				skipEmptyString: true,
			}
		);

		router.push(url);
	};

	// const onClear = () => {
	// 	// setValue("");
	// 	reset();
	// };

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative w-full lg:w-[400px] flex items-center"
		>
			<Input
				{...register("value")}
				// value={value}
				// onChange={(e) => setValue(e.target.value)}
				disabled={isSubmitting}
				className="rounded-l-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
				placeholder="Search"
			/>
			{getFieldState("value").isDirty && (
				<X
					onClick={() => reset()}
					className="absolute top-2.5 right-14 size-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
				/>
			)}
			<Button
				type="submit"
				size="sm"
				variant="secondary"
				className="rounded-l-none"
				disabled={isSubmitting}
			>
				<SearchIcon className="size-5 text-muted-foreground" />
			</Button>
		</form>
	);
}
