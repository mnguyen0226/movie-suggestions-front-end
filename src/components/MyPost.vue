<template>
	<article ref="article">
		<h2>{{ movie.title }}</h2>
		<p>{{ movie.description }}</p>
	</article>
</template>
  
<script>
/* eslint-disable */
import { defineProps, onMounted, onUnmounted ,ref} from "vue";

const props = defineProps({
	movie: Object,
});

export default {
	props: ["movie"],
	setup(props) {
		const articleRef = ref(null);
		let startTime;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				startTime = performance.now();
			} else {
				const timeInView = performance.now() - startTime;
				console.log("Time spent in view:" + timeInView + entries)
				// send timeInView to your analytics or tracking service
			}
		});

		onMounted(() => {
			observer.observe(articleRef.value);
		});

		onUnmounted(() => {
			observer.disconnect();
		});

		return { articleRef };
	},
};
</script>
  
<style>
article {
	background-color: #efefef;
	border-radius: 1rem;
	padding: 1rem 2rem;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
	margin-bottom: 2rem;
	color: #2c3e50;
}

article h2 {
	margin-bottom: 1rem;
}
</style>
  