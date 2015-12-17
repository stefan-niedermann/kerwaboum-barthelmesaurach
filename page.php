<?php get_header(); ?>
		<div id="main">
			<?php if (have_posts()) : the_post(); ?>
			<h2><?php the_title(); ?></h2>
			<div class="entry">
				<?php the_content(); ?>
			</div>
			<?php comments_template( '', true );  ?>
			<?php endif; ?>
		</div>
<?php get_footer(); ?>
