<?php
$email = $_REQUEST['email'];
if(!empty($email)){
    echo $email;
    return $email;
}else{
    return 'error';
}
?>