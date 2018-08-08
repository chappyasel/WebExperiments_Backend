<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
    
    update(get_PDO());
    
    function update($db) {
		$user = get_body('user');
		$id = dict_require($user, 'username');
		if (!has_user($db, $id)) {
			error("user $id not found");
		}
		foreach($user as $key => $value) {
			if($value !== $id) {
				update_user($db, $id, $key, $value);
			}
    	}
		log_activity($db, $id);
		success("$id updated");
    }

?>