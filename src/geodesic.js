// Two.js has convenient methods to make shapes and insert them into the scene.
var two;
var window_size = Math.min(.5*window.innerHeight, .5*window.innerWidth);
var t = 0;

// Make an instance of two and place it on the page.
function startup()
{
    var params = {
        fullscreen: false
        };
    var elem = document.body;
    two = new Two(params).appendTo(elem);
    two.renderer.setSize(window_size * 2, window_size);

    draw();
}


function resetTime()
{
    t = 0;
}

function draw()
{
    // make a grid
    grid_spacing = 10;
    num_grid_lines_x = two.width / grid_spacing;
    num_grid_lines_y = two.height / grid_spacing;
    for(var i = 0; i < num_grid_lines_x; i++) {
        a = two.makeLine(grid_spacing*i, 0, grid_spacing*i, two.height)
        a.stroke = '#6dcff6';
    }
    for(var i = 0; i < num_grid_lines_y; i++) {
        a = two.makeLine(0, grid_spacing*i, two.width, grid_spacing*i)
        a.stroke = '#6dcff6';
    }

    // make a black hole
    var radius = 50;
    var x = two.width * 0.5;
    var y = two.height * 0.5;// - radius * 1.25;
    var circle = two.makeCircle(x, y, radius)
    circle.fill = '#000000'

    // move a particle in a circle (animation test)
    var p_r = 10;
    var p_x = two.width / 4;
    var p_y = two.height / 2;
    var particle = two.makeCircle(p_x, p_y, p_r);
    particle.fill = '#000000'

    two.bind('update', update)
    two.play();

    // time variable for evolution
    t = 0;

    var orbit_radius = two.width / 4;

    var fake_decay = 10;

    // this is called every frame by two.play()
    function update(frameCount) {
        t += 0.1;
        //particle.translation.x = (p_x*2) + orbit_radius*Math.cos(t);
        //particle.translation.y = p_y + orbit_radius*Math.sin(t);

        //change BH size based on slider value
        BH_scale = document.getElementById("BHMass").value;
        circle.radius = radius*BH_scale;
        var checkbox = document.getElementById("decay");

        //change particle orbit with BH size
        if (!checkbox.checked) {
        particle.translation.x = (p_x*2) + orbit_radius*Math.cos(t)*0.02*circle.radius;
        particle.translation.y = p_y + orbit_radius*Math.sin(t)*0.02*circle.radius; }
        
        else{
        particle.translation.x = (p_x*2) + fake_decay/t * orbit_radius*Math.cos(t)*0.02*circle.radius;
        particle.translation.y = p_y + fake_decay/t * orbit_radius*Math.sin(t)*0.02*circle.radius;}
    }


}