<script>
	import { gameState } from "../stores.js";
	import { onMount } from "svelte";
	let falsy = `<svg viewBox="0 0 20 20">
						<path
							d="M 4 4 L 16 16"
							stroke="#d85b35"
							stroke-width="3"
							fill="none"
							stroke-linecap="round"
						/>
						<path
							d="M 4 16 L 16 4"
							stroke="#d85b35"
							stroke-width="3"
							fill="none"
							stroke-linecap="round"
						/>
					</svg>`;
	let truthy = `<svg viewBox="0 0 20 20">
						<path
							d="M 4 10 L 8 16 L 16 4"
							stroke="#43b48a"
							stroke-width="3"
							fill="none"
							stroke-linecap="round"
						/>
					</svg>`;

	export let grid = {};

	function genInitField(columns) {
		let arr = [];
		let size = columns - 1;
		let sub = Array.apply(null, { length: size }).fill(1);
		arr.push([...sub]);
		for (let i = size - 1; i > 0; i--) {
			sub[i] = 0;
			arr.push([...sub]);
		}
		return arr;
	}

	function repeat(num, text) {
		let str = "";
		for (let i = 0; i < num; i++) {
			str += text;
			if (i !== num - 1) {
				str += "_";
			}
		}
		return str;
	}
	//3x2 4[5]
	//4x3 5[6]
	//5x4 7[8]
	let tileSize = 6;
	// let tileSize = 6; //
	// let tileSize = 8; //
	// let tileSize = 8; //

	function generateBoardConfig(data) {
		let config = [];
		let totalCells = data.cols ** 2;

		let [primary, secondary, ...rest] = grid.groups;
		let cols = [secondary, ...rest];
		let rows = [primary, ...rest.reverse()];

		//row 1
		config.push(null);
		for (let i = 0; i < data.cols - 1; i++) {
			config.push({
				type: "col-legend",
				heading: cols[i].heading,
				groups: cols[i].entries,
			});
		}

		for (let i = 0; i < data.cols - 1; i++) {
			config.push({
				type: "row-legend",
				heading: rows[i].heading,
				groups: rows[i].entries,
			});
			let c = data.cols - 1 - i;
			for (let j = 0; j < data.cols - 1; j++) {
				if (c > 0) {
					let coords = [];
					for (let k = 0; k < data.rows ** 2; k++) {
						coords.push({
							mainRow: i,
							mainCol: j,
							sub: k,
						});
					}
					config.push({
						type: "grid",
						fields: coords,
					});
				} else {
					config.push(null);
				}
				c--;
			}
		}

		return config;
	}
	onMount(async () => {});
	function updateGameState(id) {
		console.log(id);
		gameState.update((n) => {
			return n;
		});
	}
</script>

<!-- columns X rows -->
<div
	style="--cols:{grid.cols}; --tilesize:{tileSize}rem;"
	class="w-fit h-fit boardGrid font-oswald"
>
	{#each generateBoardConfig(grid) as entry, index (index)}
		{#if entry?.type === "col-legend"}
			<div class="relative w-full h-full bg-accent2-300">
				<div class="bg-accent1 text-accent2-500 absolute -top-6 truncate w-full h-fit pl-1">
					{entry.heading}
				</div>
				<div class="col-legend w-full h-full gap-1">
					{#each entry.groups as col}
						<div class="bg-accent2-500 writingmode-vert grid content-center pt-1">
							<span class="truncate text-accent1">{col}</span>
						</div>
					{/each}
				</div>
			</div>
		{:else if entry?.type === "row-legend"}
			<div class="relative w-full h-full bg-accent2-300">
				<div
					class="bg-accent1 text-accent2-500 absolute -left-6 truncate w-fit h-full writingmode-vert pt-1"
				>
					{entry.heading}
				</div>
				<div class="row-legend w-full h-full gap-1">
					{#each entry.groups as row}
						<div class="bg-accent2-500 grid content-center pl-1">
							<span class="truncate text-accent1">{row}</span>
						</div>
					{/each}
				</div>
			</div>
		{:else if entry?.type === "grid"}
			<div style="--rows:{grid.rows};" class="subGrid">
				{#each entry.fields as id}
					<div
						class="bg-accent2-400 rounded-sm"
						data-id={id}
						on:click={() => updateGameState(id)}
					/>
				{/each}
			</div>
		{:else}
			<div class="" />
		{/if}
	{/each}
</div>

<style>
	.boardGrid {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(var(--cols), var(--tilesize));
		grid-template-rows: repeat(var(--cols), var(--tilesize));
		grid-auto-flow: row;
	}
	.subGrid {
		display: grid;
		gap: 0.25rem;
		grid-template-columns: repeat(var(--rows), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		grid-auto-flow: row;
	}

	.col-legend {
		display: grid;
		grid-template-columns: repeat(var(--rows), 1fr);
		grid-auto-flow: column;
	}
	.row-legend {
		display: grid;
		grid-template-rows: repeat(var(--rows), 1fr);
		grid-auto-flow: row;
	}
</style>
