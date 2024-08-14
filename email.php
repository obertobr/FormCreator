<?php

// Send email
function fmcr_send_email($sender_name, $sender_email, $to, $subject, $message) {
    $headers = [
        'From: '."=?UTF-8?B?".base64_encode($sender_name)."?=".' <'.$sender_email.'>',
        'Content-type: text/html; charset=iso-8859-1'
    ];

    return wp_mail( $to, $subject, $message, $headers);
}

// draw email
function fmcr_draw_email($fields) {
    $content = "";
    foreach( $fields as $field ) {
        if( $field->type == "heading") {
            $content .= "<br>\n";
            $content .= "<h1>".$field->title."</h1>\n";
        } else {
            $content .= "<h2>".$field->title."</h2>\n";
            $content .= "<span>".$field->value."</span>\n";
            $content .= "\n";
        }
    }

    return $content;
}

