<?php get_header(); ?>
		<?php
		if(is_dynamic_sidebar()) {
			echo '<div id="main" class="sidebar">';
		} else {
			echo '<div id="main">';
		}
		?>
			<?php if (have_posts()) : the_post(); ?>
			<div class="entry">
				<?php the_content(); ?>
			</div>
			<?php endif; ?>
		</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
