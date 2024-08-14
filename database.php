<?php
// Recive entry Data
add_action("wp_ajax_fmcr_saveFormData", "fmcr_saveFormData");
add_action("wp_ajax_nopriv_fmcr_saveFormData", "fmcr_saveFormData");
function fmcr_saveFormData() {
    $referer = $_SERVER['HTTP_REFERER'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $data = $_POST['data'];
    $data = str_replace('\\','', $data);
    $data = json_decode($data);

    global $wpdb;
    $table_name = $wpdb->prefix . 'fmcr_entries';

    $result = $wpdb->insert(
        $table_name,
        array(
            'formName' => $data->name,
            'json' => json_encode($data->fields),
            'data' => current_time('mysql'),
            'referer' => $referer,
            'ip' => $ip
        )
    );

    if ($result === false) {
        error_log("Failed to insert data into the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to insert data into the database"), 500);
        exit();
    }

    $table_name = $wpdb->prefix . 'fmcr_forms';

    $email = $wpdb->get_row( "SELECT senderName,senderEmail,sendEmailTo FROM $table_name WHERE id=$data->id" );

    if ($email->senderEmail != "" and $email->sendEmailTo != "") {
        $validation = fmcr_send_email(
            $email->senderName,
            $email->senderEmail,
            $email->sendEmailTo,
            "[".$data->name."] - form entry",
            fmcr_draw_email($data->fields)
        );

        if( $validation == false ) {
            error_log("Failed to send email");
        }
    }

    wp_send_json_success(array("message" => "Added successfully"), 200);
    exit();
}

// get Entries
add_action("wp_ajax_fmcr_getEntries", "fmcr_getEntries");
add_action("wp_ajax_nopriv_fmcr_getEntries", "fmcr_getEntries");
function fmcr_getEntries() {
    
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_entries';

    $results = $wpdb->get_results( "SELECT id,formName,data FROM $table_name ORDER BY data DESC" );

    $entries = $results;
    
    wp_send_json( $entries, 200);
    exit();
}

// get Entry
add_action("wp_ajax_fmcr_getEntry", "fmcr_getEntry");
add_action("wp_ajax_nopriv_fmcr_getEntry", "fmcr_getEntry");
function fmcr_getEntry() {
    $id = $_POST['id'];
    
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_entries';

    $entry = $wpdb->get_row( "SELECT * FROM $table_name WHERE id=$id" );

    $json = $entry->json;
    $json = json_decode($json);

    $entry->fields = $json;
    
    unset($entry->json);
    
    wp_send_json( $entry, 200);
    exit();
}

// New view
add_action("wp_ajax_fmcr_newView", "fmcr_newView");
add_action("wp_ajax_nopriv_fmcr_newView", "fmcr_newView");
function fmcr_newView() {
    $name = $_POST['name'];

    $ip = $_SERVER['REMOTE_ADDR'];
    
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_views';

    $result = $wpdb->insert(
        $table_name,
        array(
            'formName' => $name,
            'date' => current_time('mysql'),
            'ip' => $ip
        )
    );

    if ($result === false) {
        error_log("Failed to insert view into the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to insert view into the database"), 500);
        exit();
    }
    
    wp_send_json_success(array("message" => "Added successfully"), 200);
    exit();
}

// create form
add_action("wp_ajax_fmcr_createForm", "fmcr_createForm");
add_action("wp_ajax_nopriv_fmcr_createForm", "fmcr_createForm");
function fmcr_createForm() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'fmcr_forms';

    $last_id = $wpdb->get_var("SELECT MAX(id) FROM $table_name");
    if ($last_id === null) {
        $last_id = 1;
    } else {
        $id = $last_id+1;
    }

    $result = $wpdb->insert(
        $table_name,
        array(
            'formName' => "form$id",
            'json' => "",
            'lastEditDate' => current_time('mysql'),
            'createDate' => current_time('mysql'),
            'senderName' => "",
            'senderEmail' => "",
            'sendEmailTo' => "",
        )
    );

    if ($result === false) {
        error_log("Failed to insert data into the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to insert data into the database"), 500);
        exit();
    }

    $id = $wpdb->insert_id;
    
    wp_send_json_success(array("message" => "Added successfully", "id" => $id), 200);
    exit();
}

// Delete form
add_action("wp_ajax_fmcr_deleteForm", "fmcr_deleteForm");
add_action("wp_ajax_nopriv_fmcr_deleteForm", "fmcr_deleteForm");
function fmcr_deleteForm() {
    $id = intval($_POST['id']);

    global $wpdb;
    $table_name = $wpdb->prefix . 'fmcr_forms';

    $result = $wpdb->delete(
        $table_name,
        array(
            'id' => $id
        )
    );

    if ($result === false) {
        error_log("Failed to remove form of the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to remove form of the database"), 500);
        exit();
    }

    $file = plugin_dir_path(__FILE__) . "forms/$id.html";

    unlink($file);
    
    wp_send_json_success(array("message" => "removed successfully"), 200);
    exit();
}

// save form
add_action("wp_ajax_fmcr_saveForm", "fmcr_saveForm");
add_action("wp_ajax_nopriv_fmcr_saveForm", "fmcr_saveForm");
function fmcr_saveForm() {
    $id = intval($_POST['id']);
    $html = $_POST['html'];
    $html = str_replace('\\','', $html);
    $data = $_POST['data'];
    $data = str_replace('\\','', $data);
    $data = json_decode($data);
    $settings = $_POST['settings'];
    $settings = str_replace('\\','', $settings);
    $settings = json_decode($settings);

    global $wpdb;
    $table_name = $wpdb->prefix . 'fmcr_forms';

    $result = $wpdb->update(
        $table_name,
        array(
            'formName' => $data->name,
            'json' => json_encode($data->pages),
            'lastEditDate' => current_time('mysql'),
            'senderName' => $settings->email->senderName,
            'senderEmail' => $settings->email->senderEmail,
            'sendEmailTo' => $settings->email->sendEmailTo,
        ), array(
            'id' => $id
        )
    );

    if ($result === false) {
        error_log("Failed to update data into the database: " . $wpdb->last_error);
        wp_send_json_error(array("error" => "Failed to update data into the database"), 500);
        exit();
    }

    $file = plugin_dir_path(__FILE__) . "forms/$id.html";
    file_put_contents($file, $html);

    
    wp_send_json_success(array("message" => "updated successfully"), 200);
    exit();
}

// get Form
add_action("wp_ajax_fmcr_getForm", "fmcr_getForm");
add_action("wp_ajax_nopriv_fmcr_getForm", "fmcr_getForm");
function fmcr_getForm() {
    $id = $_POST['id'];
    
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_forms';

    $form = $wpdb->get_row( "SELECT * FROM $table_name WHERE id=$id" );

    $json = $form->json;
    $json = json_decode($json);

    $form->fields = $json;
    
    unset($form->json);
    
    wp_send_json( $form, 200);
    exit();
}

// get Form
add_action("wp_ajax_fmcr_getForms", "fmcr_getForms");
add_action("wp_ajax_nopriv_fmcr_getForms", "fmcr_getForms");
function fmcr_getForms() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'fmcr_forms';

    $forms = $wpdb->get_results( "SELECT id,formName,lastEditDate FROM $table_name ORDER BY lastEditDate DESC" );
    
    wp_send_json( $forms, 200);
    exit();
}