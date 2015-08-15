<!DOCTYPE html>
<html>
	<head>
		<meta name="theme-color" content="#512da8">
		<title>MaterialOS</title>
		<link rel="icon" href="/img/favicon.ico">
		<link rel="stylesheet" target="_blank" href="/css/materialdesignicons.min.css"></link>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="/css/styles.css">
	</head>
	<body>
		<div class="header mosparallax" id="header">
			<div class="upfin-container">
				<div class="card upfin">
					<div class="card-content">
						<p class="card-title" id="title">Laoding Results...</p>
						<p id="description">Do you have Javascript enabled?</p>
						<div id="toggleadvanced" class="grey-text text-darken-2" onclick="toggleadvanced();">Show Advanced</div>
						<div class="console">
							<p id="console">					
<?php
$repo = $_POST["repo"];
$author = $_POST["author"];
$notes = $_POST["notes"];
for ($i = 0; $i < count($_FILES['filesToUpload']['name']); $i++) {
	$target_dir = "uploads/{$repo}/{$author}/";
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
	echo nl2br(htmlentities(shell_exec("./gitcreatepr.sh \"" . $author . "\" \"" . $notes . "\" " . $repo . " 2>&1")), false);
}
?>
							</p>
						</div>
					</div>
					<div class="card-action">
						<div class="right">
							<a class="btn-flat waves-effect grey-text text-darken-2" href="/">Home</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<a class="btn-floating btn-large waves-effect waves-light blue modal-trigger singlefab tooltipped" data-position="left" data-delay="50" data-tooltip="Donate" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=materialopensource%40gmail%2ecom&lc=US&item_name=MaterialOS&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"><i class="material-icons">attach_money</i></a>

		<!-- Scripts -->
		<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>
		<script src="/js/uploadfinished.js"></script>
	</body>
</html>