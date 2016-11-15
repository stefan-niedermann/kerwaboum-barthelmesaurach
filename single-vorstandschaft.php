<?php
	get_header();
	wp_enqueue_style('style', get_template_directory_uri().'/page-vorstandschaft.css' );
?>
		<div id="main">hallo welt
			<?php if (have_posts()) : the_post(); ?>
			<h2><?php the_title(); ?></h2>
			<div class="entry">
				<?php the_content(); ?>
			</div>
			<?php comments_template( '', true );  ?>
			<?php endif; ?>
		</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
