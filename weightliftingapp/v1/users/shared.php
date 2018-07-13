<?php

    function has_user($db, $id) {
        return found_row($db, "SELECT * FROM users WHERE id='$id'");
    }

	function insert_user($db, $id) {
        date_default_timezone_set('America/Los_Angeles');
        $date = date('y-m-d');
        $time = date('y-m-d H:i:s');
        $db->query("INSERT INTO users (id, date_created, date_updated) " .
                   "VALUES ('$id', '$date', '$time')");
    }

    function delete_user($db, $id) {
        return found_row($db, "DELETE FROM users WHERE id='$id'");
    }

?>
