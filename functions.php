<?php
	remove_action('wp_head', 'wp_generator');
	show_admin_bar( false );

	// Register Navigation Menus
	function sn_register_nav_menus() {
		register_nav_menu('header-menu',__( 'Header Menu' ));
		register_nav_menu('banner-menu',__( 'Banner Menu' ));
	}
	add_action( 'init', 'sn_register_nav_menus' );

	// Register Sidebars
	function sn_register_sidebars() {
		register_sidebar(array(
			'id' => 'main-sidebar',
			'name' => __( 'Front Page Sidebar' )
		));
		register_sidebar(array(
			'id' => 'archive-sidebar',
			'name' => __( 'Archive Sidebar' )
		));
		register_sidebar(array(
			'id' => 'single-sidebar',
			'name' => __( 'Single Sidebar' )
		));
		register_sidebar(array(
			'id' => 'page-sidebar',
			'name' => __( 'Page Sidebar' )
		));
	}
	add_action( 'init', 'sn_register_sidebars' );

	// Remove Generator-Tag in HTML Markup
	remove_action('wp_head', 'wp_generator');

	// Set Quality of Image-Upload to maximum
	add_filter('jpeg_quality', function($arg){return 100;});
	add_filter( 'wp_editor_set_quality', function($arg){return 100;} );

	// Format Title
	function sn_wp_title( $title, $sep ) {
		global $paged, $page;

		if ( is_feed() )
			return $title;

		// Add the site name.
		$title .= get_bloginfo( 'name' );

		// Add the site description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) )
			$title = "$title $sep $site_description";

		// Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 )
			$title = "$title $sep " . sprintf( __( 'Page %s', 'niedermann' ), max( $paged, $page ) );

		return $title;
	}
	add_filter( 'wp_title', 'sn_wp_title', 10, 2 );

	// Generate HTML5 Tags
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form' ) );

	// enables post and comment RSS feed links to head
	add_theme_support( 'automatic-feed-links' );

	function the_breadcrumb() {
		if(!is_home()) {
			echo '<ul class="breadcrumb">';
			echo '<li><a href="';
			echo get_option('home');
			echo '">';
			bloginfo('name');
			echo '</a></li>';
			if (is_category() || is_single()) {
				echo '<li>';
				the_category('title_li=');
				echo '</li>';
				if (is_single()) {
					echo '<li>';
					the_title();
					echo '</li>';
				}
			} elseif (is_page()) {
				echo '<li>';
				echo the_title();
				echo '</li>';
			}
			echo '</ul>';
		}
	}

	function posts_by_year() {
	  // array to use for results
	  $years = array();

	  // get posts from WP
	  $posts = get_posts(array(
		'numberposts' => -1,
		'orderby' => 'post_date',
		'order' => 'ASC',
		'post_type' => 'post',
		'post_status' => 'publish'
	  ));

	  // loop through posts, populating $years arrays
	  foreach($posts as $post) {
		$years[date('Y', strtotime($post->post_date))][] = $post;
	  }

	  // reverse sort by year
	  krsort($years);

	  return $years;
	}
?>
