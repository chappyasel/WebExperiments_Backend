<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
    
    delete(get_PDO());
    
    function delete($db) {
		$id = get_param('username');
        if(!delete_user($db, $id)) {
         	error("user $id not found"); 
		}
		success("$id deleted");
    }

?>