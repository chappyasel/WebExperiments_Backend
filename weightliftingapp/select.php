<?php
    
    include('common.php');
    
    select(get_PDO());
    
    function select($db) {
        header('Content-type: application/json');
        $rows = $db->query('SELECT id, date_created FROM users');
        $users = $rows->fetchAll(PDO::FETCH_ASSOC);
        print json_encode(array("users"=>$users));
    }

?>