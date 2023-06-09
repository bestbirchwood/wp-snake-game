<?php
/*
Plugin Name: Snake Game
Description: A simple WordPress plugin that lets users play the classic Snake game in their web browser.
Version: 0.1
Author: Dennis Birkhölzer
Auhtor URI: https://www.dennisbirkhoelzer.com
*/

function snake_game_shortcode() {
    wp_enqueue_style('snake-game-css', plugins_url('/css/style.css', __FILE__));
    wp_enqueue_script('snake-game-js', plugins_url('/js/snake.js', __FILE__), array(), '1.0', true);
    return file_get_contents(plugin_dir_path(__FILE__) . 'index.html');
}
require 'plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/bestbirchwood/wp-snake-game',
	__FILE__,
	'wp-snake-game'
);

//Set the branch that contains the stable release.
$myUpdateChecker->setBranch('main');

add_shortcode('snake_game', 'snake_game_shortcode');
?>
