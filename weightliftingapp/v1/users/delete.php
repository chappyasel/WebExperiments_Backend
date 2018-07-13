<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('user_shared.php');
    
    delete(get_PDO());
    
    function delete($db) {
		$id = get_param('id');
        if(!delete_user($db, $id)) {
         	error("user $id not found"); 
		}
		success("$id deleted");
    }

?>