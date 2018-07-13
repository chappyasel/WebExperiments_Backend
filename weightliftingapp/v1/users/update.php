<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
    
    update(get_PDO());
    
    function update($db) {
       	$id = get_param('id');
		$online = get_param('online');
		
		date_default_timezone_set('America/Los_Angeles');
        $time = date('y-m-d H:i:s');
		
        if (!found_row($db, "UPDATE users SET date_updated='$time', logged_in='$online' WHERE id='$id'")) {
            error("user $id not found");
        }
        success("$id has been updated");
    }

?>