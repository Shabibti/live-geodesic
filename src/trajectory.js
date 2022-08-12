/*===========================================================================*\
 * Discrete Cosine Transform
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * This code is not designed to be highly optimized but as an educational
 * tool to understand the Mel-scale and its related coefficients used in
 * human speech analysis.
\*===========================================================================*/
var cosMap = null;

// Builds a cosine map for the given input size. This allows multiple input sizes to be memoized automagically
// if you want to run the DCT over and over.
var memoizeCosines = function(N) {
  cosMap = cosMap || {};
  cosMap[N] = new Array(N*N);

  var PI_N = Math.PI / N;

  for (var k = 0; k < N; k++) {
    for (var n = 0; n < N; n++) {
      cosMap[N][n + (k * N)] = Math.cos(PI_N * (n + 0.5) * k);
    }
  }
};

function dct(signal, scale) {
  var L = signal.length;
  scale = scale || 2;

  if (!cosMap || !cosMap[L]) memoizeCosines(L);

  var coefficients = signal.map(function () {return 0;});

  return coefficients.map(function (__, ix) {
    return scale * signal.reduce(function (prev, cur, ix_, arr) {
      return prev + (cur * cosMap[L][ix_ + (ix * L)]);
    }, 0);
  });
};

function EandL(p, e, M)
{
    var E, L;
    E = Math.sqrt(((p-2)*(p-2)-4*e*e)/(p*(p-3-e*e)));
    L = p*M/Math.sqrt(p-3-e*e);

    return [ E, L ];

}


var constants = EandL(p,e,M);
var E = constants[0];
var L = constants[1];
var r1 = p/(1-e);
var r2 = p/(1+e);
var r3 = 1/(1-E*E) - (r1+r2)/2 + Math.sqrt(((r1+r2)/2 - 1/(1-E*E))*((r1+r2)/2 - 1/(1-E*E)));
var r4 = 0;
var p3 = r3*(1-e)/M;
var p4 = 0;

function rhs(chi)
{
	return M*Math.sqrt(1-E*E)*Math.sqrt( (p-p3) - e*( p + p3*Math.cos(chi) ) )*Math.sqrt( (p-p4) + e*( p - p4*Math.cos(chi) ) )/(1-e*e);
}


var N = 30;
var signal = new Array(N);

for ( let i = 0 ; i<N; i++ )
{
	signal[i] = rhs(i*Math.PI/N);
}


var coef = dct(signal);

console.log(coef);



