		<aside id="sidebar">
			<ul>
			<?php
				if ( is_front_page() ) :
					dynamic_sidebar( __( 'Front Page Sidebar' ) );
				elseif ( is_page() ) :
					dynamic_sidebar( __( 'Page Sidebar' ) );
				elseif ( is_single() ) :
					dynamic_sidebar( __( 'Single Sidebar' ) );
				elseif ( is_archive() ) :
					dynamic_sidebar( __( 'Archive Sidebar' ) );
				endif;
			?>
			</ul>
		</aside>