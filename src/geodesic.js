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

two.update();

}