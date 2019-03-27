<?php
    
    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
    
    query(get_PDO());
    
    function query($db) {
		$query = get_body('query');
		$mode = dict_require($query, 'mode');
		if (array_key_exists('username', $query)) {
			$id = $query['username'];
			switch($mode) {
				case 'exists':
					print json_encode(array("exists"=>(has_user($db, $id)))); break;
				case 'profile':
					if (has_user($db, $id)) {
						print json_encode(array("users"=>get_user($db, $id, 'profile')));
					} else {
						error("user $id not found");
					} break;
				default:
					error("Invalid mode. One of: exists, profile"); break;
			}
		} else {
			$select = select_for_mode($mode);
			$sort = dict_optional($query, 'sort', 'last_activity');
			$order = dict_optional($query, 'order', 'DESC');
			$limit = dict_optional($query, 'limit', 100);
			$offset = dict_optional($query, 'offset', 0);
			$rows = $db->query("SELECT $select FROM users 
								ORDER BY $sort $order, last_activity DESC
								LIMIT $offset, $limit");
			$users = $rows->fetchAll(PDO::FETCH_ASSOC);
			print json_encode(array("users"=>$users));
		}
    }

?>