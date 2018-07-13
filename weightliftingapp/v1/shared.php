<?php

    error_reporting(E_ALL);

	function basic_auth() {
		$raw_auth = apache_request_headers()['Authorization'];
		if (preg_match('/Basic\s+(.*)$/i', $raw_auth, $auth)) {
			list($name, $pass) = explode(':', base64_decode($auth[1]));
			return array('username'=>$name, 'password'=>$pass);
		}
		error("Authentication not passed or incorrect");
	}

    function get_PDO() {
        $dbname = 'weightliftingapp';
        $ds = "mysql:host=localhost;dbname=$dbname;charset=utf8";
		$auth = basic_auth();
        try {
            $db = new PDO($ds, $auth['username'], $auth['password']);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $db;
        } catch (PDOException $ex) {
            error("Cannot connect to database. details:$ex");
        }
    }

    function found_row($db, $query) {
        return $db->query($query)->rowCount() > 0;
    }

	function get_param($param) {
		if (!isset($_GET[$param])) {
            error_param($param);
        }
        return $_GET[$param];
	}

	function success($msg) {
        header('Content-Type: application/json');
        print json_encode(array('success'=>$msg));
    }

	function error_param($param) {
		error_params([$param]);
	}

	function error_params($params) {
		$msg = 'Missing required param. One of:';
		for ($i = 0; $i < count($params); $i++) {
            $msg .= ' ' . $params[$i];
            if ($i != count($params) - 1) {
                $msg .= ',';
            }
        }
        error($msg);
	}

    function error($msg) {
        header('Content-Type: application/json');
        header('HTTP/1.1 400 Invalid Request');
        die(json_encode(array('error'=>$msg)));
    }

?>
