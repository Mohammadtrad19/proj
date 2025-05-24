<?php
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "pharmacy";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username']; // We'll use this for display purposes
    $email = $_POST['email']; // This will be our primary key
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // First check if the email already exists
    $check_sql = "SELECT * FROM users WHERE email = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows > 0) {
        echo "<script>alert('Email already registered. Please use a different email or try logging in.'); window.location.href='login.html';</script>";
        $check_stmt->close();
        $conn->close();
        exit;
    }
    $check_stmt->close();

    // If email doesn't exist, proceed with registration
    // The id field will be auto-incremented by the database
    $sql = "INSERT INTO users (email, pass) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);

    if ($stmt->execute()) {
        // Registration successful
        echo "<script>alert('Registration successful! You can now login.'); window.location.href='login.html';</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "'); window.location.href='register.html';</script>";
    }

    $stmt->close();
}

$conn->close();
?>