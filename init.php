<?php
//Create DB
function fmcr_create_database_table() {
    global $wpdb;

    //Entries DB
    $table_name = $wpdb->prefix . 'fmcr_entries';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        formName tinytext NOT NULL,
        json text NOT NULL,
        data datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        referer text,
        ip tinytext NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );

    //Forms DB
    $table_name = $wpdb->prefix . 'fmcr_forms';

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        formName tinytext NOT NULL,
        json text NOT NULL,
        lastEditDate datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        createDate datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        senderName tinytext NOT NULL,
        senderEmail tinytext NOT NULL,
        sendEmailTo tinytext NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    dbDelta( $sql );

    //views DB
    $table_name = $wpdb->prefix . 'fmcr_views';

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        formName tinytext NOT NULL,
        date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        ip tinytext NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    dbDelta( $sql );
}