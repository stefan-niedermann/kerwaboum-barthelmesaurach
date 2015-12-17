<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<title><?php wp_title('-', 'true', 'right'); ?></title>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="shortcut icon" href="/favicon.png" type="image/png" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
		<meta name="theme-color" content="#D50D17" />
		<?php wp_enqueue_style('style', get_template_directory_uri().'/style.css' ); ?>
		<?php wp_enqueue_style('normalize', get_template_directory_uri().'/css/normalize-3.0.0.css', array(), '3.0.0' ); ?>
		<?php wp_enqueue_script( 'script.js', get_template_directory_uri() . '/js/script.js' ); ?>
		<!--[if lte IE 9]><script src="http://www.feuerwehr-barthelmesaurach.de/wp-content/plugins/ie9.js/ie9.js"></script><![endif]-->
		<!--[if lte IE 9]>
			<style type="text/css">
				footer.page-footer {
					width: 80%;
					margin-left: auto;
					margin-right: 0;
				}
			</style>
		<![endif]-->
		<!--[if lte IE 8]>
			<style type="text/css">
				.menu-bannermenue-container::before,
				.menu-bannermenue-container::after {
					display: none !important;
				}
				.page-nav {
					margin-top: 0;
				}

				a[href^="tel:"] {
					padding-right: inherit;
					background: none !important;
				}
			</style>
		<![endif]-->
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<ul class="notification-bar">
			<!--[if lte IE 8]><li id="ie-warnung"><strong>Achtung:</strong> Sie verwenden einen veralteten, unsicheren Browser! Wir empfehlen den Einsatz von <strong><a href="https://www.mozilla.org/de/firefox/new/" title="Mozilla Firefox herunterladen">Mozilla Firefox</a></strong> oder <strong><a href="https://www.google.com/intl/de/chrome/browser/" title="Google Chrome herunterladen">Google Chrome</a></strong></li><![endif]-->
		</ul>
		<header class="page-header">
			<h1 class="page-title"><?php bloginfo( 'name' ); ?></h1>
			<img src="<?php bloginfo('template_directory'); ?>/images/wappen.png" alt="Wappen der Kerwaboum Barthelmesaurach e. V." id="wappen" />
		</header>
		<?php wp_nav_menu( array( 'theme_location' => 'banner-menu' ) ); ?>
		<div id="wrapper">
			<nav class="page-nav" role="navigation" id="main-nav">
				<?php wp_nav_menu( array( 'theme_location' => 'header-menu', 'menu_class' => 'header-menu' ) ); ?>
			</nav>
			<div id="content">
			<?php the_breadcrumb(); ?>
