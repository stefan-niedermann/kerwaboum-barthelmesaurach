<?php get_header(); ?>
	<div id="main">
		<?php foreach(posts_by_year() as $year => $posts) : ?>
			<h2><?php echo $year; ?></h2>
			<ul>
				<?php $posts = sort_posts($posts, 'post_date', 'DESC'); ?>
				<?php foreach($posts as $post) : setup_postdata($post); ?>
					<li>
						<?php the_time('d. M'); ?>: <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</li>
				<?php endforeach; ?>
			</ul>
		<?php endforeach; ?>
		
		<?php
		function sort_posts( $posts, $orderby, $order = 'ASC', $unique = true ) {
			if ( ! is_array( $posts ) ) {
				return false;
			}
			
			usort( $posts, array( new Sort_Posts( $orderby, $order ), 'sort' ) );
			
			// use post ids as the array keys
			if ( $unique && count( $posts ) ) {
				$posts = array_combine( wp_list_pluck( $posts, 'ID' ), $posts );
			}
			
			return $posts;
		}

		class Sort_Posts {
			var $order, $orderby;
			
			function __construct( $orderby, $order ) {
				$this->orderby = $orderby;
				$this->order = ( 'desc' == strtolower( $order ) ) ? 'DESC' : 'ASC';
			}
			
			function sort( $a, $b ) {
				if ( $a->{$this->orderby} == $b->{$this->orderby} ) {
					return 0;
				}
				
				if ( $a->{$this->orderby} < $b->{$this->orderby} ) {
					return ( 'ASC' == $this->order ) ? -1 : 1;
				} else {
					return ( 'ASC' == $this->order ) ? 1 : -1;
				}
			}
		}
		?>
	</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
