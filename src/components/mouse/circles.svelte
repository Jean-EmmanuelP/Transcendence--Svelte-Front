<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const coords = { x: 0, y: 0 };
		const circles: NodeListOf<HTMLDivElement> = document.querySelectorAll('.circle');
		let isVisible: boolean = true;
		let animationFrameId: number;

		const colors: string[] = [
			'#ffb56b',
			'#fdaf69',
			'#f89d63',
			'#f59761',
			'#ef865e',
			'#ec805d',
			'#e36e5c',
			'#df685c',
			'#d5585c',
			'#d1525c',
			'#c5415d',
			'#c03b5d',
			'#b22c5e',
			'#ac265e',
			'#9c155f',
			'#950f5f',
			'#830060',
			'#7c0060',
			'#680060',
			'#60005f',
			'#48005f',
			'#3d005e'
		];

		function handleMouseOut() {
			isVisible = false;
			circles.forEach((circle) => {
				circle.style.visibility = 'hidden';
			});
		}

		function handleMouseOver() {
			isVisible = true;
			circles.forEach((circle) => {
				circle.style.visibility = 'visible';
			});
		}

		function handleMouseMove(e: MouseEvent) {
			coords.x = e.clientX;
			coords.y = e.clientY;
		}

		document.addEventListener('mouseout', handleMouseOut);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mousemove', handleMouseMove);

		circles.forEach(function (circle, index) {
			circle.dataset.x = '0';
			circle.dataset.y = '0';
			circle.style.backgroundColor = colors[index % colors.length];
		});
		function animateCircles() {
			if (!isVisible) {
				circles.forEach((circle) => {
					circle.style.visibility = 'hidden';
				});
			}
			let x = coords.x;
			let y = coords.y;
			circles.forEach(function (circle, index) {
				circle.style.left = x - 12 + 'px';
				circle.style.top = y - 12 + 'px';
				circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
				circle.dataset.x = x.toString();
				circle.dataset.y = y.toString();
				const nextCircle = circles[index + 1] || circles[0];
				x += (parseFloat(nextCircle.dataset.x || '0') - x) * 0.3;
				y += (parseFloat(nextCircle.dataset.y || '0') - y) * 0.3;
			});
			animationFrameId = requestAnimationFrame(animateCircles);
		}

		animateCircles();

		return () => {
			cancelAnimationFrame(animationFrameId);
			document.removeEventListener('mouseout', handleMouseOut);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<!-- Circle Elements -->
{#each Array(24) as _, i}
	<div class="circle" />
{/each}

<style>
	.circle {
		height: 24px;
		width: 24px;
		border-radius: 24px;
		background-color: black;
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 99999999; /* so that it stays on top of all other elements */
	}
</style>
