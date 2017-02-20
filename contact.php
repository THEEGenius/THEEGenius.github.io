<?php

  if (isset($_POST['email'])) {
    //email
    $email_to = "aseokana@gmail.com";
    $email_subject = "Open Hive Contact Form";
    $email_from = "Open Hive";

    //error code
    function died($error){
      echo "We are sorry, error found with the form you submitted";
      echo "errors below.<br/><br/>";
      echo $error. "<br/><br/>";
      echo "please go back";
      die();
    }
    //validation
    if (!isset($_POST['name']) && !isset($_POST['email']) && !isset($_POST['content'])) {
      died('We are sorry. Problem with form');
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $content = $_POST['content'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if (!preg_match($email_exp, $email)) {
        $error_message .= 'Email not valid<br/>';
    }
    $string_exp = "/^[A-za-z.'-]+$/";
    if (!preg_match($string_exp, $name)) {
        $error_message .= 'Name not valid<br/>';
    }
    if (strlen($content) < 2) {
      $error_message .= 'Email content should have more than two characters<br/>';
    }
    if (strlen($error_message) > 0) {
      died($error_message);
    }
    $email_message = "Form details below.\n\n";

    function clean_string($string){
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad, "", $string);
      $email_message .= "Name:" .= clean_string($name) ."\n";
      $email_message .= "Email:" .= clean_string($email) ."\n";
      $email_message .= "Content:" .= clean_string($content) ."\n";

      //email header
      $headers = 'From:' .$email_from. "\r\n". 'Reply-To:' .$email. "\r\n".
                  'X-Mailer: PHP/' . phpversion();
      @mail($email_to, $email_subject, $email_message, $headers);

      ?>
      <!--Success Message-->
      Thank yoou for conatacting us. We will be in touch with you shortly.</br>
      <?php
    }

  }

 ?>
