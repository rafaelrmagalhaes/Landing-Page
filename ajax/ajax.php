<?php
include 'conexao.php';
$return = array();
$return['return'] = false;
$request = $_REQUEST;

if($request['form'] == 'form-email'){
    formEmail($request, $return);
} else if($request['form'] == 'form-more'){
    formMore($request, $return);    
} else if($request['form'] == 'form-friend'){
    formFriend($request, $return);
} else {
    echo json_encode($return);
    return json_encode($return);
}

function formEmail($request, $return)
{
    $email = $request['email'];
    if(!empty($email)){
        $return['return'] = true; $return['email'] = $email;
        $result = mysql_query("SELECT email FROM emails WHERE email='".$email."'");
        $num = mysql_num_rows($result);	
        if($num<=0)
        {
            $id = mysql_insert_id();
            $time = date("Y-m-d H:i:s");
            mysql_query("INSERT INTO emails (id, email, createdAt) VALUES ('".$id."', '".$email."', '".$time."')") or die(mysql_error());
            $id = mysql_query("SELECT id FROM emails WHERE email='".$email."'");
            $id = mysql_fetch_object($id);
            $id = $id->id;
            $return['id'] = $id;
            echo json_encode($return);
            return json_encode($return);
        } else {
            $id = mysql_query("SELECT id FROM emails WHERE email='".$email."'");
            $id = mysql_fetch_object($id);
            $id = $id->id;
            $return['id'] = $id;
            echo json_encode($return);
            return json_encode($return);
        }
    }else{
        echo json_encode($return);
        return json_encode($return);
    }
}

function formMore($request, $return)
{
    $id_email = $request['id_email'];
    $telefone = $request['telefone'];
    $nome = $request['nome'];
    $mensagem = $request['mensagem'];
    if(!empty($telefone) && !empty($id_email)){
        $return['return'] = true;
        $id = mysql_insert_id();
        $time = date("Y-m-d H:i:s");
        mysql_query("
            INSERT INTO more 
            (id, id_email, nome, tel, mensagem, createdAt)
            VALUES
            ('".$id."', '".$id_email."', '".$nome."', '".$telefone."', '".$mensagem."', '".$time."')")
            or die(mysql_error());
        echo json_encode($return);
        return json_encode($return);
    }else{
        echo json_encode($return);
        return json_encode($return);
    }
}

function formFriend($request, $return)
{
    $id_email = $request['id_email'];
    $email = $request['email'];
    if(!empty($email)){
        $return['return'] = true;
        $id = mysql_insert_id();
        $time = date("Y-m-d H:i:s");
        mysql_query("INSERT INTO friend (id, id_email, email_amigo, createdAt) VALUES ('".$id."', '".$id_email."', '".$email."', '".$time."')") or die(mysql_error());
        echo json_encode($return);
        return json_encode($return);
    }else{
        echo json_encode($return);
        return json_encode($return);
    }
}
?>