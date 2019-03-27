<?php

	include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
		
    username(get_PDO());

    function username($db) {
		if (has_param('username_from') || has_param('username_to')) {
			$from = get_param('username_from');
			$to = get_param('username_to');
			if (!has_user($db, $from)) {
				error("user $from not found");
			}
			if (has_user($db, $to)) {
				error("user $to already exists");
			}
			update_user($db, $from, 'username', $to);
			print json_encode(array('username'=>$to));
		} else {
			$valid = false;
			while (!$valid) {
				$random = rand(10000000, 99999999);
				$id = "User $random";
				if (!has_user($db, $id)) {
					print json_encode(array('username'=>$id));
					$valid = true;
				}
			}
		}
    }

?>
