import request from '@/utils/request'

export function UploadCdn(url, params) {
  return request({
    url: url,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

