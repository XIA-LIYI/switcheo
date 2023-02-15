var sum_to_n_a = function(n) {

    result = 0;
    for (let i = 0; i <= n; i++) {
        result += i;
    }
    return result;
};

var sum_to_n_b = function(n) {

    result = 0;
    i = 0;
    while (i <= n) {
        result += i;
        i++;
    }
    return result;
};

var sum_to_n_c = function(n) {

    result = (1 + n) * n / 2;
    return result;
};