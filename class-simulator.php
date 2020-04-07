<?php
 
// Create Widget Class

class simulator_widget extends WP_Widget {
 
    function __construct() {
    parent::__construct(
    
    // Widget id
    'simulator_widget', 
    
    // Widget name will appear in user interface
    __('External Simulator Widget', 'simulator_widget_domain'), 
    
    // Widget description
    array( 'description' => __( 'External Simulator Widget', 'simulator_widget_domain' ), ) 
    );
    }
 
    // Create widget front-end
 
    public function widget( $args, $instance ) {
        $title = apply_filters( 'widget_title', $instance['title'] );
        
        // Before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if ( ! empty( $title ) )
            echo $args['before_title'] . $title . $args['after_title'];
        
        // Ouput html page with form 
        ?>
        <?php include_once('form-simulator.php'); ?>
        
        <?php
            echo $args['after_widget'];
    }
         
    // Instance

    public function form( $instance ) {
        if ( isset( $instance[ 'title' ] ) ) {
            $title = $instance[ 'title' ];
        }
        else {
            $title = __( 'New title', 'simulator_widget_domain' );
        }

    // Admin form 

    ?>
    <p>
    <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
    <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
    </p>
    <?php 
}

    // Updating widget replacing old instances with new

    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
        return $instance;
    }

} // Class simulator_widget ends here
