<?php

/*
Plugin Name: Simulator Widget
Plugin URI: https://www.frentecorretora.com.br
Description: A simple widget for external simulator with paper money and remittance integration from Simple Plataform by Frente Corretora de Câmbio LTDA.
Version: 1.0.9
Author: Frente Corretora 
Author URI: https://www.frentecorretora.com.br
License: The MIT License (MIT) Copyright © 2020 Frente Corretora de Câmbio
*/

// Load CSS files

function load_styles() {
    wp_enqueue_style( 'simulatorCss', plugins_url( 'css/main.min.css', __FILE__ ) );
    wp_enqueue_style( 'materializeMinCss', plugins_url( 'materialize/css/materialize.min.css', __FILE__ ) );

    wp_register_style( 'material_web', 'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css' );
    wp_enqueue_style('material_web');
}
add_action('wp_enqueue_scripts', 'load_styles');

// Load JS files


function load_scripts() {

    wp_register_script( 'material_components', 'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js', null, null, true );
    wp_enqueue_script('material_components');

    wp_register_script( 'font_awesome', 'https://kit.fontawesome.com/9a64f37b30.js', null, null, true );
    wp_enqueue_script('font_awesome');

    wp_enqueue_script( 'jQuery', plugin_dir_url( __FILE__ ) . 'materialize/js/jquery.min.js', '1.0.0' );    
    wp_enqueue_script( 'materializeMinJs', plugin_dir_url( __FILE__ ) . 'materialize/js/materialize.min.js', array('jquery'), '1.0.0' );

    wp_enqueue_script( 'request', plugin_dir_url( __FILE__ ) . 'js/request.js', array( 'jquery' ), '1.0.0' );
    wp_enqueue_script( 'agent', plugin_dir_url( __FILE__ ) . 'js/agent.js', array( 'jquery' ), '1.0.0' );
    wp_enqueue_script( 'paperMoney', plugin_dir_url( __FILE__ ) . 'js/paper-money.js', array( 'jquery' ), '1.0.0' );
    wp_enqueue_script( 'submit', plugin_dir_url( __FILE__ ) . 'js/submit.js', '1.0.0', array( 'jquery' ), false );
    wp_enqueue_script( 'remittance', plugin_dir_url( __FILE__ ) . 'js/remittance.js', array( 'jquery' ), '1.0.0' );
    wp_enqueue_script( 'index', plugin_dir_url( __FILE__ ) . 'js/index.js', array( 'jquery' ), '1.0.0' );

}
add_action('wp_enqueue_scripts', 'load_scripts');


// Register and load widget 

function simulator_load_widget() {
    register_widget( 'simulator_widget' );
}
add_action( 'widgets_init', 'simulator_load_widget' );


// Load simulator class

require_once('class-simulator.php');
