<?php

	include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('user_shared.php');
		
    insert(get_PDO());

    function insert($db) {
        if (!isset($_GET['id'])) {
            error('missing param: id');
        }
        $id = $_GET['id'];
        if(has_user($db, $id)) {
            error("User $id already exists");
        }
        insert_user($db, $id);
        success("$id added to users");
    }

?>
