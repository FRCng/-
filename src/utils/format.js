//格式化汽车属性
export function format(value) {
  if (!value) {
    return '';
  }
  return JSON.parse(value);
}

//获取指定属性的key值
export function getCarsAttrKry(params) {
  if (!params.data) {
    return '';
  }
  const data = format(params.data);
  if (data[params.parent] && data[params.parent][params.children]) {
    return data[params.parent][params.children];
  }
  return '';
}
