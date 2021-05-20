/*
* Author: LJH
* Date: 2021/4/28
* Description:
*/
import request from '@/utils/request';
export default {
  newsList(data) {
    return request({
      url: '/getWangYiNews',
      method: 'post',
      data,
    })
  },
  newsDetail(path) {
    const url = path.replace('https://www.163.com', '');
    return request({
      url,
      method: 'get',
    })
  }
}
