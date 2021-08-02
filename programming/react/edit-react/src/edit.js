const MAX_ROWS = 512;
const MAX_COLS = 512;

var mat = new Array(MAX_ROWS);
for (var i = 0; i < MAX_ROWS; i++) {
    mat[i] = new Array(MAX_COLS);
    mat[i][0] = i;
}
for (var j = 0; j < MAX_COLS; j++) {
    mat[0][j] = j;
}

var last_x = null;
var last_y = null;

function edit(x, y) {
    let n = x.length;
    let m = y.length;
    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= m; j++) {
            let delta = (x[i-1] == y[j-1]) ? 0 : 1;
            mat[i][j] = Math.min(mat[i-1][j-1] + delta, mat[i-1][j]+1, mat[i][j-1]+1);
        }
    }
    last_x = x;
    last_y = y;
    return mat[n][m];
}