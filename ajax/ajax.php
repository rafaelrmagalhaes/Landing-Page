<?php
$db['server'] = 'localhost';
$db['user'] = 'root';
$db['password'] = '';
$db['db'] = 'zeencontra';
$conexao = mysql_connect($db['server'],$db['user'],$db['password']);
mysql_select_db($db['db'],$conexao);

$return = array();
$return['return'] = false;

if($_REQUEST['form'] == 'form-email'){
    formEmail($_REQUEST);
} else if($_REQUEST['form'] == 'form-more'){
    
} else if($_REQUEST['form'] == 'form-friend'){
    
} else {
    return 'error';
}

function formEmail($_REQUEST)
{    
    $email = $_REQUEST['email'];
    if(!empty($email)){
        $return['return'] = true; $return['email'] = $email;
        $result = mysql_query("SELECT email FROM emails WHERE email='".$email."'");
        $num = mysql_num_rows($result);	
        if($num<=0)
        {
            $id = mysql_insert_id();
            $time = date("Y-m-d H:i:s");
            mysql_query("INSERT INTO emails (id, email, createdAt) VALUES ('".$id."', '".$email."', '".$time."')") or die(mysql_error());
            echo json_encode($return);
            return $return;
        } else {
            echo json_encode($return);
            return $return;
        }
    }else{
        return $return;
    }
}
?>