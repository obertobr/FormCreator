<?php
/*
 * Plugin Name: FormCreator
 * Description: Plugin para criar e compartilhar formularios no seu site.
 */


// Add menu page of plugin
add_action( 'admin_menu', 'fmcr_add_pages' );
function fmcr_add_pages() {
    add_menu_page(
        'Teste',
        'FormCreator',
        'manage_options',
        'fmcr',
        'fmcr_teste',
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

// Import form page
function fmcr_teste() {
    include(plugin_dir_path(__FILE__) . "editor/teste.html");
}
// Import entries page
function fmcr_entries() {
    include(plugin_dir_path(__FILE__) . "entries/entries.html");
}


// Add style and script on form page
add_action('admin_enqueue_scripts', 'fmcr_enqueue_scripts');
function fmcr_enqueue_scripts($hook) {
    // Toplevel page
    if ($hook == 'toplevel_page_slugTeste') {
        wp_enqueue_style('fmcr-form-style', plugins_url('editor/style/fields.css', __FILE__));

        wp_enqueue_script('fmcr-form-script', plugins_url('editor/script/form.js', __FILE__), array('jquery'), null, true);

        wp_localize_script('fmcr-form-script', 'formScriptAjax', [
            'url' => admin_url('admin-ajax.php')
        ]);

        return;
    }

    // Entries page
    if($hook == 'formcreator_page_fmcr_entries') {
        wp_enqueue_style('fmcr-form-style', plugins_url('entries/style/entries.css', __FILE__));

        return;
    }
}

//Create DB
function fmcr_create_database_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_form';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        json text NOT NULL,
        data datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}

// On plugin activate
register_activation_hook( __FILE__, 'fmcr_activate' );
function fmcr_activate() {
    fmcr_create_database_table();
}


// Recive Form Data
add_action("wp_ajax_fmcr_saveFormData", "fmcr_saveFormData");
add_action("wp_ajax_nopriv_fmcr_saveFormData", "fmcr_saveFormData");
function fmcr_saveFormData() {
    $data = $_POST['data'];
    $data = str_replace('\\','', $data);

    global $wpdb;
    $table_name = $wpdb->prefix . 'fmcr_form';

    $result = $wpdb->insert(
        $table_name,
        array(
            'data' => current_time('mysql'),
            'json' => $data
        )
    );

    if ($result === false) {
        error_log("Failed to insert data into the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to insert data into the database"), 500);
        exit();
    }
    
    wp_send_json_success(array("message" => "Added successfully"), 200);
    exit();
}