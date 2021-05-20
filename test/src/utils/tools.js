/*
* Author: LJH
* Date: 2021/4/28
* Description:
*/

export function to(promise) {
  if (promise && promise.then) {
    return promise.then((data) => [null, data]).catch((err) => [err]);
  }
  return [null, promise];
}
