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

export function edit(x, y) {
    console.log(`ED(${x},${y})`)
    let n = x.length;
    let m = y.length;
    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= m; j++) {
            let delta = (x[i - 1] === y[j - 1]) ? 0 : 1;
            mat[i][j] = Math.min(mat[i - 1][j - 1] + delta, mat[i - 1][j] + 1, mat[i][j - 1] + 1);
        }
    }
    return mat;
}

export function closeDiagonalBacktracking(dpMatrix, n, m) {
    let i = n;
    let j = m;
    let script = [];
    while (i > 0 && j > 0) {
        let a = dpMatrix[i-1][j-1];
        let b = dpMatrix[i-1][j];
        let c = dpMatrix[i][j-1];
        let d = dpMatrix[i][j];
        if (a === d && a <= b && a <= c) { // Match
            script.push([i,j,0]);
            i--;
            j--;
            continue;
        }
        if (a < b && a < c) { // Sub
			script.push([i, j, 1]);
			i--;
			j--;
			continue;
		}
        if (b < a && b < c) { // Del
			script.push([i, j, 1]);
			i--;
			continue;
		}
        if (c < a && c < b) { // Del
			script.push([i, j, 1]);
			j--;
			continue;
		}
        if (a === b && b === c) { // Tie All
			script.push([i, j, 1])
			if (i < j) {
				j--;
			}
			if (i === j) {
				i--;
				j--;
			}
			if (i > j) {
				i--;
			}
			continue;
		}
        script.push([i, j, 1]);
        if (a === b) {
			if (i > j) {
				i--;
			} else {
				i--;
				j--;
			}
		}
        if (a === c) {
			if (i < j) {
				j--;
			} else {
				i--;
				j--;
			}
		}
        if (b === c) {
			if (i < j) {
				j--;
			} else {
				i--;
			}
		}
    }
    while(i > 0) {
		script.push([i, j, 1]);
		i--;
	}
	while(j > 0) {
		script.push([i, j, 1]);
		j--;
	}
	script.push([0, 0, 0]);
	return script.reverse();
}

export function scriptToOps(script) {
    let k = script.length;
    let ops = []
    for (let i = 1; i < k; i++) {
        if (script[i][2] === 0) {
            ops.push('M');
            continue;
        }
        let di = script[i][0] - script[i-1][0];
        let dj = script[i][1] - script[i-1][1];
        if (di > 0 && dj > 0) {
            ops.push('S');
            continue;
        }
        if (di === 0) {
            ops.push('S');
            continue
        }
        if (dj === 0) {
            ops.push('D');
            continue;
        }
        ops.push('?');
    }
    return ops;
}
