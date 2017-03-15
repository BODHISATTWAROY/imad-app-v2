<html> 
    <body> 
        <form action="add.php" method="post"> 
            First Name : <input type="text" name="firstname" size="40" length="40" value="First Name"><BR> 
            Surname : <input type="text" name="surname" size="40" length="40" value="Surname"><BR> 
            Email Address : <input type="text" name="emailaddress" size="40" length="40" value="Email Address"><BR> 
            <input type="submit" name="submit" value="Submit"> 
            <input type="reset" name="reset" value="Clear It"> 
        </form> 
    </body> 
</html> 



<form action="add.php" method="post"> 





<html> 
    <body> 
        <?php 
        $db = pg_connect('host=localhost dbname=contacts user=contacts password=firstphp'); 

        $firstname = pg_escape_string($_POST['firstname']); 
        $surname = pg_escape_string($_POST['surname']); 
        $emailaddress = pg_escape_string($_POST['emailaddress']); 

        $query = "INSERT INTO friends(firstname, surname, emailaddress) VALUES('" . $firstname . "', '" . $surname . "', '" . $emailaddress . "')";
        $result = pg_query($query); 
        if (!$result) { 
            $errormessage = pg_last_error(); 
            echo "Error with query: " . $errormessage; 
            exit(); 
        } 
        printf ("These values were inserted into the database - %s %s %s", $firstname, $surname, $emailaddress); 
        pg_close(); 
        ?> 
    </body> 
</html> 
