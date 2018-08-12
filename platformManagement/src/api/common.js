import request from '@/utils/request'

export function getConfig(path) {
  path = decodeURIComponent(path)
  return request({
    url: path,
    method: 'get'
  })
}
