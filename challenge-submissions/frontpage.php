<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>bad joke machine</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>
<style>
    .content {
        padding: 15px;
        font-size: 18px;
        min-height: 50px;
        margin-bottom: 15px;
        margin-left: 15px;
        margin-right: 15px;
    }

    .achtergrond {
        background: rgb(1, 102, 128);
    }

    .woord {
        word-spacing: 5px;
    }

    .warning {
        color: crimson;
    }
</style>

<body>
    <div class="container">
        <div class="row">
            <div class="col-sm achtergrond content">
                <form method ="POST" action="frontpage.php" name="normal_joke">
                    <h1>press button for joke</h1>
                    <input type ="submit" name="tell_a_joke" value="tell me a joke">
        

                </form>
                <?php
                $start = $_POST["tell_a_joke"];
                $min = 1; 
                $max = 4;
                   
                    if($start == "tell me a joke")
                    {
                    $random = rand($min, $max);
                    }
                    if($random == 1)
                    {
                        echo"what did a drummer call his twin girls? <Br>
                        Anna one Anna two";
                    }
                    if($random == 2)
                    {
                        echo"how do you make holy water? <Br>
                        by boiling the hell out of it";
                    }
                    if($random == 3)
                    {
                        echo"why should you never fart in a apple store? <br>
                        because they don't have window's";
                    }
                    if($random == 4)
                    {
                        echo"My favorite word is It just rolls off the tongue.";
                    }
                ?>

            </div>
        </div>
    </div>
    </div>
</body>

</html>