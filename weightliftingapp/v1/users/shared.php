<?php

    function has_user($db, $id) {
        return found_row($db, "SELECT username FROM users WHERE username='$id' LIMIT 1");
    }

	function insert_user($db, $id) {
        $db->query("INSERT INTO users (username) VALUES ('$id')");
		update_user($db, $id, 'last_activity', date('Y-m-d H:i:s'));
    }

	function update_user($db, $id, $key, $value) {
        return found_row($db, "UPDATE users SET $key='$value' WHERE username='$id' LIMIT 1");
    }

	function log_activity($db, $id) {
		return update_user($db, $id, 'last_activity', date('Y-m-d H:i:s'));
	}

    function delete_user($db, $id) {
        return found_row($db, "DELETE FROM users WHERE username='$id' LIMIT 1");
    }

?>
