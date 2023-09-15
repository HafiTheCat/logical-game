<script>
	import Logical from "./lib/Logical.svelte";
	let testlogical = {
		logical: {
			grid: {
				cols: 4,
				rows: 3,
				groups: [
					{
						heading: "Female",
						entries: ["Ruby", "Spot", "Starbuck"],
					},
					{
						heading: "Male",
						entries: ["Batman", "Dibii", "Jack"],
					},
					{
						heading: "Activity",
						entries: ["Ball", "Lazer", "Sleep"],
					},
					{
						heading: "Kittens",
						entries: ["1", "2", "3"],
					},
				],
			},
			clues: [
				"Batman chose the female who liked to chase a ball, but she was not Starbuck.",
				"Dibii's companion liked to chase the laser light.",
				"Ruby loved to cuddle up to her male for a long afternoon nap in the sun.",
				"Starbuck had two more kittens than Batman's companion",
			],
			solution: {
				desc: ["Female", "Male", "Activity", "Kittens"],
				rows: [
					["Ruby", "Jack", "Sleep", "2"],
					["Spot", "Batman", "Ball", "1"],
					["Starbuck", "Dibii", "Lazer", "3"],
				],
			},
		},
	};
	let testlogical2 = {
		logical: {
			grid: {
				cols: 3,
				rows: 2,
				groups: [
					{
						heading: "Female",
						entries: ["Ruby", "Spot"],
					},
					{
						heading: "Male",
						entries: ["Batman", "Dibii"],
					},
					{
						heading: "Activity",
						entries: ["Ball", "Lazer"],
					},
				],
			},
		},
	};

	let testlogical3 = {
		logical: {
			grid: {
				cols: 5,
				rows: 4,
				groups: [
					{
						heading: "Female",
						entries: ["Ruby", "Spot", "Starbuck", "Starbuck"],
					},
					{
						heading: "Male",
						entries: ["Batman", "Dibii", "Jack", "Jack"],
					},
					{
						heading: "Activity",
						entries: ["Ball", "Lazer", "Sleep", "Sleep"],
					},
					{
						heading: "Kittens",
						entries: ["1", "2", "3", "3"],
					},
					{
						heading: "testHeading",
						entries: ["E1", "2", "3", "3"],
					},
				],
			},
		},
	};
</script>

<main class="grid place-items-center h-full w-full">
	<Logical grid={testlogical.logical.grid} />
</main>
