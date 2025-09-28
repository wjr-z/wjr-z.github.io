<?php
//存有美图链接的文件名img.txt
$filename = "img.txt";
if(!file_exists($filename)){
    die('文件不存在');
}
//从文本获取链接
$pics = [];
$fs = fopen($filename, "r");
while(!feof($fs)){
    $line=trim(fgets($fs));
    if($line!=''){
        array_push($pics, $line);
    }
}
//从数组随机获取链接
$pic = 'https://cdn.jsdelivr.net/gh/wjr-z/random_img/'.$pics[array_rand($pics)];
//返回指定格式
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $type=$_GET['type'];
  switch($type){
  //JSON返回
  case 'json':
      header('Content-type:text/json');
      die(json_encode(['pic'=>$pic]));
 
  default:
      die(header("Location: $pic"));
  }
}else{
  die(header("Location: $pic"));
}
?>
