/*
 * 将浮点数的小数点去掉（由于js浮点数使用IEEE-745表示法，
 * 该操作可以将浮点数的运算转换成证书运算，消除对浮点数进行计算时产生的浮点数误差）
 */
 function removeDecimalPoint(float) {
 	var isInteger = Number.isInteger ? Number.isInteger : parseInt;
 	return isInteger(float) ? float : float * Math.pow(10, float.toString().split('.')[1].length);
 }