<?php

    include('common.php');
    
    delete(get_PDO());
    
    function delete($db) {
        if (isset($_GET["mode"])) {
            $mode = $_GET["mode"];
            if ($mode != "removeall") {
                error("Unknown mode $mode.");
            }
            $db->query("DELETE FROM users");
            success("All users deleted");
        } else if (isset($_GET["id"])) {
            $id = $_GET["id"];
            if(!delete_user($db, $id)) {
               error("user $id not found"); 
            } 
            success("$id deleted");
        } else {
            error("missing param: id");
        }
    }

?>