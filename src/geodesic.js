// Two.js has convenient methods to make shapes and insert them into the scene.
var two;

// Make an instance of two and place it on the page.
function startup()
{
    var params = {
        fullscreen: true
        };
    var elem = document.body;
    two = new Two(params).appendTo(elem);

    draw();
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

// make a curve to trail the particle
var points = []
for(var k=0; k < 5; k++)
    points.push(new Two.Anchor(p_x, p_y - k*20))
var trail = two.makeCurve(points, true)
trail.linewidth = 2;
trail.scale = 1.75;
trail.noFill();
trail.stroke = 'rgba(255, 0, 0, 0.5)';

// time variable for evolution
var t = 0;

var orbit_radius = two.width / 4;

// keep track of last 5 points in particle orbit
var particle_points_x = [];
var particle_points_y = [];

two.bind('update', update)
two.play();

// this is called every frame by two.play()
function update(frameCount) {
    t += 0.1;
    var new_x = (p_x*2) + orbit_radius * Math.cos(t);
    var new_y = p_y - orbit_radius * Math.sin(t);
    document.write(new_x);
    particle_points_x.push(new_x);
    particle_points_y.push(new_y);

    particle.translation.x = new_x;
    particle.translation.y = new_y;

    // update trail points
    for(var i=0; i < particle_points_x.length; i++) {
        var p = points[i];
        var trail_x = particle_points_x[particle_points_x.length - 1 - i];
        var trail_y = particle_points_y[particle_points_y.length - 1 - i];
        p.x = trail_x;
        p.y = trail_y;
    }
}

}