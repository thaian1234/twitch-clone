"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ElementRef, useRef, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
	initialValue: string | null;
}

type BioInput = {
	bio: string | null;
};

export function BioModal({ initialValue }: BioModalProps) {
	const { register, handleSubmit, getValues } = useForm<BioInput>({
		defaultValues: {
			bio: initialValue,
		},
	});
	const [isPending, startTransistion] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);
	const bio = getValues("bio");

	const onSubmit = handleSubmit((data) => {
		if (!data || data.bio === bio) {
			closeRef.current?.click();
			return toast.success("Bio updated");
		}

		startTransistion(() => {
			updateUser({
				bio: data.bio,
			})
				.then(() => {
					toast.success("Bio updated");
					closeRef.current?.click();
				})
				.catch(() => toast.error("Cannot update bio"));
		});
	});

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="link" size="sm" className="ml-auto">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user bio</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-14">
					<Textarea
						{...register("bio")}
						placeholder="User bio"
						disabled={isPending}
						className="resize-none"
					/>

					<DialogFooter className="flex justify-between">
						<DialogClose ref={closeRef} asChild>
							<Button type="button" variant="ghost">
								Cancel
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							variant="primary"
							type="submit"
						>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
