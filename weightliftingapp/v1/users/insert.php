<?php

	include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
		
    insert(get_PDO());

    function insert($db) {
        $id = get_param('username');
        if(has_user($db, $id)) {
            error("user $id already exists");
        }
        insert_user($db, $id);
        success("$id added to users");
    }

?>
