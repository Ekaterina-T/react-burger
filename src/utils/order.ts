// TODO: create class for order

const formatOrderNumber = (num: number): string => {
  const MAX_CHART_NUM = 5;
  const number = String(num);
  const leadingZeroCount = MAX_CHART_NUM - number.length;
  let prefix = '';
  while (prefix.length < leadingZeroCount) {
    prefix += '0';
  }
  return prefix + number;
};

export default formatOrderNumber;
