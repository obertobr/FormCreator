<?php
/*
 * Plugin Name: FormCreator
 * Description: Plugin para criar e compartilhar formularios no seu site.
 */


//add_filter( 'wp_mail_from', function( $email ) {
//    return 'rafael.azzi@hotmail.com';
//} );

// Add menu page of plugin
add_action( 'admin_menu', 'fmcr_add_pages' );
function fmcr_add_pages() {
    add_menu_page(
        'Teste',
        'FormCreator',
        'manage_options',
        'fmcr',
        'fmcr_home',
        plugin_dir_url(__FILE__) . 'images/placeholder.png',
        20
    );

    add_submenu_page(
        'fmcr',
        'Entries',
        'Entries',
        'manage_options',
        'fmcr_entries',
        'fmcr_entries'
    );
}

// Import home page
function fmcr_home() {
    if(isset($_GET['id'])){
        //Editor
        include(plugin_dir_path(__FILE__) . "editor/editor.html");
    } else {
        //Home
        include(plugin_dir_path(__FILE__) . "home/home.html");
    }
}
// Import entries page
function fmcr_entries() {
    include(plugin_dir_path(__FILE__) . "entries/entries.html");
}

add_shortcode('fmcr', 'fmcr_teste_shortcode');
function fmcr_teste_shortcode($atts = [], $tag = '') {

    $atts = array_change_key_case( (array) $atts, CASE_LOWER );

    $atts = shortcode_atts(
		array(
			'id' => '0',
		), $atts, $tag
	);

    $file = plugin_dir_path(__FILE__) . "forms/".$atts['id'].".html";

    ob_start();
    if (file_exists($file)) {
        include($file);
    } else {
        include(plugin_dir_path(__FILE__) . "forms/0.html");
    }
    return ob_get_clean();
}

// Add style and script on form page
add_action('wp_enqueue_scripts', 'fmcr_enqueue_scripts');
add_action('admin_enqueue_scripts', 'fmcr_enqueue_scripts');
function fmcr_enqueue_scripts($hook) {
    // Shortcode page
    if(is_singular() && has_shortcode(get_post()->post_content, 'fmcr')) {
        wp_enqueue_style('fmcr-form-style', plugins_url('editor/style/fields.css', __FILE__));

        wp_enqueue_script('fmcr-form-script', plugins_url('form.js', __FILE__), array('jquery'), null, true);

        wp_localize_script('fmcr-form-script', 'ajaxScript', [
            'url' => admin_url('admin-ajax.php')
        ]);

        return;
    }

    // Home page
    if ($hook == 'toplevel_page_fmcr') {
        if(isset($_GET['id'])){
            //Editor
            wp_enqueue_style('fmcr-home-fields-style', plugins_url('editor/style/fields.css', __FILE__));
            wp_enqueue_style('fmcr-home-editor-style', plugins_url('editor/style/editor.css', __FILE__));

            wp_enqueue_script_module('fmcr-home-script', plugins_url('editor/script/editor.js', __FILE__));
            $ajax_url = admin_url('admin-ajax.php');
            $inline_script = "const ajaxurl = '{$ajax_url}';";
            wp_add_inline_script('fmcr-home-script', $inline_script, 'before');
        } else{
            //Home
            wp_enqueue_style('fmcr-home-style', plugins_url('home/style/home.css', __FILE__));

            //wp_enqueue_script('fmcr-chartjs-script', plugins_url('libraries/chart.min.js', __FILE__));
            wp_enqueue_script_module('fmcr-chartjs-script', plugins_url('libraries/chartjs/chart.js', __FILE__));
            wp_enqueue_script('fmcr-home-script', plugins_url('home/script/home.js', __FILE__), array('jquery'), null, true);
            wp_localize_script('fmcr-home-script', 'ajaxScript', [
                'url' => admin_url('admin-ajax.php')
            ]);
        }

        return;
    }

    // Entries page
    if($hook == 'formcreator_page_fmcr_entries') {
        wp_enqueue_style('fmcr-form-style', plugins_url('entries/style/entries.css', __FILE__));

        wp_enqueue_script('fmcr-form-script', plugins_url('entries/script/entries.js', __FILE__), array('jquery'), null, true);

        wp_localize_script('fmcr-form-script', 'ajaxScript', [
            'url' => admin_url('admin-ajax.php')
        ]);

        return;
    }
}

// Include init (On plugin activate)
require_once plugin_dir_path(__FILE__) . '/activateAndUninstall.php';

register_activation_hook( __FILE__, 'fmcr_activate' );
function fmcr_activate() {
    fmcr_create_database_table();
}
register_uninstall_hook( __FILE__, 'fmcr_uninstall' );
function fmcr_uninstall() {
    fmcr_delete_database_table();
}

// email utils
require_once plugin_dir_path(__FILE__) . '/email.php';

// Include database functions
require_once plugin_dir_path(__FILE__) . '/database.php';

