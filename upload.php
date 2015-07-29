<?php
$author = $_POST["author"];
$notes = $_POST["notes"];
for ($i = 0; $i < count($_FILES['filesToUpload']['name']); $i++) {
	$target_dir = "uploads/icons/{$author}/";
	if (!is_dir($target_dir)) {
		if (!mkdir($target_dir, 0755, true)) {
			die('Failed to create folders.<br>');
		}
	}

	$target_file = $target_dir . basename($_FILES["filesToUpload"]["name"][$i]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	// Check if file already exists
	if (file_exists($target_file)) {
		echo "Sorry, file already exists.<br>";
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["filesToUpload"]["size"][$i] > 5000000) {
		echo "Sorry, your file is too large.<br>";
		$uploadOk = 0;
	}
	// Allow certain file formats
	if($imageFileType != "png" && $imageFileType != "psd" && $imageFileType != "svg" && $imageFileType != "ai" && $imageFileType != "sketch" && $imageFileType != "xcf") {
		echo "Sorry, only image and design files are allowed.<br>";
		$uploadOk = 0;
	}
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		echo "Sorry, your file was not uploaded.<br>";
	// if everything is ok, try to upload file
	} else {
		if (move_uploaded_file($_FILES["filesToUpload"]["tmp_name"][$i], $target_file)) {
			echo "The file ". basename( $_FILES["filesToUpload"]["name"][$i]). " has been uploaded.<br>";
		} else {
			echo "Sorry, there was an error uploading your file.<br>";
		}
	}
}
if ($uploadOk != 0) {
	echo nl2br(htmlentities(shell_exec("./gitcreatepr.sh \"" . $author . "\" \"" . $notes . "\" 2>&1")), false);
}
?>