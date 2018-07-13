<?php

    include('common.php');
    
    update(get_PDO());
    
    function update($db) {
        if (!isset($_GET["id"])) {
            error_params("missing param: id");
        }
        $id = $_GET["id"];
		
        if (!isset($_GET["online"])) {
            error_params("missing param: online");
        }
		$online = $_GET["online"];
		
		date_default_timezone_set('America/Los_Angeles');
        $time = date('y-m-d H:i:s');
		
        if (!found_row($db, "UPDATE users SET date_updated='$time' WHERE id='$id'")) {
            error("user $id not found");
        }
        success("$id has been updated");
    }

?>