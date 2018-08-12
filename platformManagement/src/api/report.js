import request from '@/utils/request'

export function getReportMetaData(params) {
  return request({
    url: '/report/meta/' + params.code,
    method: 'get',
    params: params
  })
}

export function getReportData(url, params) {
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

export function ajaxSend(params) {
  const url = params.url
  const type = params.ajaxType
  return request({
    url: url,
    method: type,
    data: params
  })
}

export function getAuthorityData(url, method, params) {
  return request({
    url: url,
    method: method,
    data: params
  })
}
