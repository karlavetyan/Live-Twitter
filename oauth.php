<?php

$config = array(
	'oauth_access_token' => '2330233478-dDiVJnRaIzHWjCRrikzTZnejuzTMTeG8iuH0vqd',
	'oauth_access_token_secret' => 'adtYuBMn6VJog6KrwOMAFQGXfrPvZOgTMQmfS9UvHMg59',
	'consumer_key' => 'dp4TrIcpHLxVM084kpwNlP5Gh',
	'consumer_secret' => 'XUkXQzu3wG7jRot8boruHJIMtko9xAsxVW44jdExqCN0nHUSIO',
	'base_url' => 'https://api.twitter.com/1.1/'
);




$url = $_GET['url'];


$url_parts = parse_url($url);
parse_str($url_parts['query'], $url_arguments);

$full_url = $config['base_url'].$url; 
$base_url = $config['base_url'].$url_parts['path']; 



function buildBaseString($baseURI, $method, $params) {
	$r = array();
	ksort($params);
	foreach($params as $key=>$value){
	$r[] = "$key=" . rawurlencode($value);
	}
	return $method."&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
}

function buildAuthorizationHeader($oauth) {
	$r = 'Authorization: OAuth ';
	$values = array();
	foreach($oauth as $key=>$value)
	$values[] = "$key=\"" . rawurlencode($value) . "\"";
	$r .= implode(', ', $values);
	return $r;
}


$oauth = array(
	'oauth_consumer_key' => $config['consumer_key'],
	'oauth_nonce' => time(),
	'oauth_signature_method' => 'HMAC-SHA1',
	'oauth_token' => $config['oauth_access_token'],
	'oauth_timestamp' => time(),
	'oauth_version' => '1.0'
);
	
$base_info = buildBaseString($base_url, 'GET', array_merge($oauth, $url_arguments));
$composite_key = rawurlencode($config['consumer_secret']) . '&' . rawurlencode($config['oauth_access_token_secret']);
$oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
$oauth['oauth_signature'] = $oauth_signature;


$header = array(
	buildAuthorizationHeader($oauth), 
	'Expect:'
);
$options = array(
	CURLOPT_HTTPHEADER => $header,

	CURLOPT_HEADER => false,
	CURLOPT_URL => $full_url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_SSL_VERIFYPEER => false
);

$feed = curl_init();
curl_setopt_array($feed, $options);
$result = utf8_decode(curl_exec($feed));
$info = curl_getinfo($feed);
curl_close($feed);


if(isset($info['content_type']) && isset($info['size_download'])){
	header('Content-Type: '.$info['content_type']);
	header('Content-Length: '.$info['size_download']);
}

echo($result);
?>
