<?php
include 'conexao.php';
$return = array();
$return['return'] = false;
$request = $_REQUEST;

function enviaEmail($msg, $return, $emails){
    if(!emails)
        $emails = "roboredo.bruno@gmail.com;rafaremagalhaes@gmail.com;contato@zeencontra.com";
    if(!$return)
        $msg. = "\r\n";
        $msg. = "Return: \r\n";
        foreach($return as $r)
        {
            $msg. = $r."\r\n";
        }
    $msg = wordwrap($msg,70);
    $headers = "MIME-Version: 1.1\r\n";
    $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
    $headers .= "From: no-reply@zeencontra.com\r\n";
    $headers .= "Return-Path: no-reply@zeencontra.com\r\n";
    mail($emails, "ERROR", $msg, $headers);
}

if($request['form'] == 'form-email'){
    formEmail($request, $return);
} else if($request['form'] == 'form-more'){
    formMore($request, $return);    
} else if($request['form'] == 'form-friend'){
    formFriend($request, $return);
} else {
    function enviaEmail("O site está fazendo alguma requisição de um form que não existe usando o arquivo ajax.", $return);
    echo json_encode($return);
    return json_encode($return);
}

function formEmail($request, $return)
{
    $email = $request['email'];
    if(!empty($email)){
        $return['return'] = true; $return['email'] = $email;
        $result = mysql_query("SELECT email FROM emails WHERE email='".$email."'");
        if(!$result)
            function enviaEmail("Erro na query que verifica se o email do primeiro form já está salvo no banco.", $return);
        $num = mysql_num_rows($result);	
        if($num<=0)
        {
            $id = mysql_insert_id();
            $time = date("Y-m-d H:i:s");
            $sql = mysql_query("INSERT INTO emails (id, email, createdAt) VALUES ('".$id."', '".$email."', '".$time."')") or die(mysql_error());
            if(!sql)
                function enviaEmail("Erro na inserção de dados no primeiro formulário (#form-email).", $return);
            $id = mysql_query("SELECT id FROM emails WHERE email='".$email."'");
            $id = mysql_fetch_object($id);
            $id = $id->id;
            $return['id'] = $id;
            echo json_encode($return);
            return json_encode($return);
        } else {
            $id = mysql_query("SELECT id FROM emails WHERE email='".$email."'");
            if(!$id)
                function enviaEmail("Erro ao tentar pegar id da tabela emails na function formEmail (primeira função do ajax).", $return);
            $id = mysql_fetch_object($id);
            $id = $id->id;
            $return['id'] = $id;
            echo json_encode($return);
            return json_encode($return);
        }
    }else{
        function enviaEmail("Primeiro formulário (#form-email) aceitou passar campo email vazio.", $return);
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
    if(!empty($telefone) || !empty($id_email)){
        $return['return'] = true;
        $id = mysql_insert_id();
        $time = date("Y-m-d H:i:s");
        $sql = mysql_query("
            INSERT INTO more 
            (id, id_email, nome, tel, mensagem, createdAt)
            VALUES
            ('".$id."', '".$id_email."', '".utf8_encode($nome)."', '".$telefone."', '".utf8_encode($mensagem)."', '".$time."')")
            or die(mysql_error());
        if(!sql)
            function enviaEmail("Erro na inserção de dados no segundo formulário (#form-more).", $return);
        echo json_encode($return);
        return json_encode($return);
    }else{
        function enviaEmail("Segundo formulário (#form-more) aceitou passar campo telefone vazio OU não conseguiu pegar o id do primeiro form (#form-email)", $return);
        echo json_encode($return);
        return json_encode($return);
    }
}

function formFriend($request, $return)
{
    $id_email = $request['id_email'];
    $email = $request['email'];
    if(!empty($email) || !empty($id_email)){
        $return['return'] = true;
        $id = mysql_insert_id();
        $time = date("Y-m-d H:i:s");
        $sql = mysql_query("INSERT INTO friend (id, id_email, email_amigo, createdAt) VALUES ('".$id."', '".$id_email."', '".$email."', '".$time."')") or die(mysql_error());
        if(!sql)
            function enviaEmail("Erro na inserção de dados no formulário indique (#form-friend).", $return);
        echo json_encode($return);
        return json_encode($return);
    }else{
        function enviaEmail("Formulário indique um amigo (#form-friend) aceitou passar campo email vazio OU não conseguiu pegar o id do form (#form-email)", $return);
        echo json_encode($return);
        return json_encode($return);
    }
}
?>