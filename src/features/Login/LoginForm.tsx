"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Define Zod schema
const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	age: z
		.number({ invalid_type_error: "Age is required" })
		.min(18, "Must be at least 18"),
	department: z.enum(["IT", "HR", "Finance"], {
		errorMap: () => ({ message: "Department is required" }),
	}),
	gender: z.enum(["male", "female"]),
	agreeToTerms: z.literal(true, {
		errorMap: () => ({ message: "You must accept the terms" }),
	}),
	address: z.object({
		street: z.string().min(1, "Street is required"),
		city: z.string().min(1, "City is required"),
	}),
	skills: z.array(z.object({ name: z.string().min(1, "Skill is required") })),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			skills: [{ name: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "skills",
	});

	const onSubmit = (data: FormData) => {
		console.log("✅ Form Submitted:", data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-xl mx-auto p-6 bg-gray-100 rounded-xl space-y-4"
		>
			<h2 className="text-xl font-bold">Complex Form</h2>

			{/* Name */}
			<div>
				<label className="block font-medium">Name</label>
				<input {...register("name")} className="border p-2 w-full rounded" />
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>

			{/* Email */}
			<div>
				<label className="block font-medium">Email</label>
				<input
					type="email"
					{...register("email")}
					className="border p-2 w-full rounded"
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>

			{/* Password */}
			<div>
				<label className="block font-medium">Password</label>
				<input
					type="password"
					{...register("password")}
					className="border p-2 w-full rounded"
				/>
				{errors.password && (
					<p className="text-red-500">{errors.password.message}</p>
				)}
			</div>

			{/* Age */}
			<div>
				<label className="block font-medium">Age</label>
				<input
					type="number"
					{...register("age", { valueAsNumber: true })}
					className="border p-2 w-full rounded"
				/>
				{errors.age && <p className="text-red-500">{errors.age.message}</p>}
			</div>

			{/* Department */}
			<div>
				<label className="block font-medium">Department</label>
				<select {...register("department")} className="border p-2 w-full rounded">
					<option value="">Select...</option>
					<option value="IT">IT</option>
					<option value="HR">HR</option>
					<option value="Finance">Finance</option>
				</select>
				{errors.department && (
					<p className="text-red-500">{errors.department.message}</p>
				)}
			</div>

			{/* Gender (Radio) */}
			<div>
				<label className="block font-medium">Gender</label>
				<div className="flex gap-4">
					<label>
						<input type="radio" value="male" {...register("gender")} /> Male
					</label>
					<label>
						<input type="radio" value="female" {...register("gender")} /> Female
					</label>
				</div>
				{errors.gender && (
					<p className="text-red-500">{errors.gender.message}</p>
				)}
			</div>

			{/* Terms */}
			<div>
				<label>
					<input type="checkbox" {...register("agreeToTerms")} /> I agree to the
					terms
				</label>
				{errors.agreeToTerms && (
					<p className="text-red-500">{errors.agreeToTerms.message}</p>
				)}
			</div>

			{/* Address */}
			<div>
				<h3 className="font-semibold">Address</h3>
				<input
					placeholder="Street"
					{...register("address.street")}
					className="border p-2 w-full rounded mt-1"
				/>
				{errors.address?.street && (
					<p className="text-red-500">{errors.address.street.message}</p>
				)}
				<input
					placeholder="City"
					{...register("address.city")}
					className="border p-2 w-full rounded mt-1"
				/>
				{errors.address?.city && (
					<p className="text-red-500">{errors.address.city.message}</p>
				)}
			</div>

			{/* Skills (Dynamic Array Fields) */}
			<div>
				<h3 className="font-semibold">Skills</h3>
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2 mt-2">
						<input
							{...register(`skills.${index}.name` as const)}
							placeholder="Skill"
							className="border p-2 rounded w-full"
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="bg-red-500 text-white px-3 rounded"
						>
							X
						</button>
					</div>
				))}
				<button
					type="button"
					onClick={() => append({ name: "" })}
					className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
				>
					Add Skill
				</button>
				{errors.skills && (
					<p className="text-red-500">{errors.skills.message as string}</p>
				)}
			</div>

			{/* Submit */}
			<button
				type="submit"
				className="bg-green-600 text-white px-6 py-2 rounded"
			>
				Submit
			</button>
		</form>
	);
}
