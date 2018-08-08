<?php

    function has_user($db, $id) {
        return found_row($db, "SELECT username FROM users 
							   WHERE username='$id' 
							   LIMIT 1");
    }

	function insert_user($db, $id) {
        $db->query("INSERT INTO users (username) 
					VALUES ('$id')");
		update_user($db, $id, 'date_created', date('Y-m-d H:i:s'));
		update_user($db, $id, 'last_activity', date('Y-m-d H:i:s'));
    }

	function update_user($db, $id, $key, $value) {
        return found_row($db, "UPDATE users 
							   SET $key='$value' 
							   WHERE username='$id' 
							   LIMIT 1");
    }

	function log_activity($db, $id) {
		return update_user($db, $id, 'last_activity', date('Y-m-d H:i:s'));
	}

    function delete_user($db, $id) {
        return found_row($db, "DELETE FROM users 
							   WHERE username='$id'
							   LIMIT 1");
    }

	function select_for_mode($mode) {
		switch($mode) {
			case 'all': return '*';
			case 'basic': return 'username, image_url, xp';
			case 'profile': return 'username, image_url, date_created, last_activity, active_now,
								    weight, weight_in_lbs, xp, total_duration, total_volume,
									total_workouts, total_sets, total_exercises, powerlifting_total,
									current_streak, longest_streak';
			default: error("Invalid mode. One of: all, basic, profile"); break;
		}
	}

	function get_user($db, $id, $mode) {
		$select = select_for_mode($mode);
        return $db->query("SELECT $select FROM users 
						   WHERE username='$id' 
						   LIMIT 1")->fetchAll(PDO::FETCH_ASSOC)[0];
    }

?>
