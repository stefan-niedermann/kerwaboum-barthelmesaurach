<?php get_header(); ?>
		<div id="main">
			<?php if (have_posts()) : the_post(); ?>
			<h2><?php the_title(); ?></h2>
			<div class="entry">
				<?php the_content(); ?>
			</div>
			<?php endif; ?>
		</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
