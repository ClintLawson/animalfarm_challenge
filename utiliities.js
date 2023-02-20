function getMax(arr){
    return Math.max.apply(null, arr);
}

function getMin(arr){
    return Math.min.apply(null, arr);
}

function getSum(arr){
    return arr.reduce((acc, val) => acc + val);
}

function getAvg(arr){
    var sum = getSum(arr);
    var val = sum / arr.length;
    return Math.round(val);
}

function getMode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

module.exports = { 
    getMax: getMax,
    getMin: getMin,
    getSum: getSum,
    getAvg: getAvg,
    getMode: getMode
};