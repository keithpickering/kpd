<?php
    //include_once "jSignature_Tools_Base30.php";

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name      = strip_tags(trim($_POST['terms-name']));
        $signature = strip_tags(trim($_POST['terms-signature']));
        $time      = date('Y-m-d H:i:s');

        if ( empty($name) OR empty($signature) OR empty($time) ) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please fill in your name and signature and try again.";
            exit;
        }

        $server = 'localhost';
        $username = 'keithpic_dbuser';
        $password = "+C_'Shg?#C4<6Qc";
        $database = 'keithpic_mainsite';

        $conn = new mysqli($server, $username, $password, $database);

        if ($conn->connect_error) {
            die('Connection failed: ' . $conn->connect_error);
        }

        $sql = "INSERT INTO contract_signatures (contract_name, contract_time, contract_signature)
        VALUES ('$name', '$time', '$signature')";

        if ($conn->query($sql) === TRUE) {           
            $recipient = "keith@keithpickering.net";
            $subject = "$name has signed the terms of service";

            // Build the email content.
            $email_content = "Name: $name\n";
            $email_content .= "Time: $time\n\n";
            $email_content .= "Signature data:\n$signature\n";

            // Build the email headers.
            $email_headers = "From: $name <$recipient>";

            // Send the email.
            if (mail($recipient, $subject, $email_content, $email_headers)) {
                // Set a 200 (okay) response code.
                http_response_code(200);
                echo 'Thanks! Your signature is on file.';
            } else {
                // Set a 500 (internal server error) response code.
                http_response_code(500);
                echo "Sorry, your signature couldn't be sent :(";
            }
            
        } else {
            echo 'Error: ' . $sql . $conn->error;
        }

        $conn->close();
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem, please try again.";
    }
?>