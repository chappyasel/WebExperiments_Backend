<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/weightliftingapp/v1/shared.php');
	include('shared.php');
    
    update(get_PDO());
    
    function update($db) {
		print_r(get_body('user'));
    }

?>