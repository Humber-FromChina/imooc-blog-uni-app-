// 封装请求对象
const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api'
function request ({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
			header: {
				icode: '676A1B2469FE9592'
			},
      data,
      method,
      success({ data, statusCode, header }) {
         if (data.success) {
           resolve(data)
         } else {
           uni.showToast({
             title:data.message,
             icon:'success',
             mask:true,
             duration:3000
           })
           reject(data.message)
         }
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export default request