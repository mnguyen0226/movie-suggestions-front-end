<template>
	<article :id="movie.movie_id">
		<div>
			<h2 :id="movie.title" class="movie_title">{{ movie.title }}</h2>
		</div>
		<div style="display: flex;">
			<div>
				<img :src="movie.image" alt="Movie poster" class="crop-image">
			</div>
			&nbsp;
			<div style="padding-left: 1em;">
				<p class="movie-description">
					<strong>About:</strong>
					&nbsp;
					{{ movie.description }}
				</p>
				<p class="movie-description">
					<strong>Actors:</strong>
					&nbsp;
					<span v-for="(actor, index) in movie.actors" :key="index">
						{{ actor }}
						<span v-if="index < movie.actors.length - 1">
							,&nbsp;
						</span>
					</span>
					.
				</p>
			</div>
		</div>
	</article>
</template>

<script>
// bring movie prop
export default {
	props: ["movie"],
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

.crop-image {
	height: 300px;
	background-size: cover;
	background-position: center center;
	border-radius: 0.5rem;
}

.movie-description {
	text-align: left;
}

</style>
