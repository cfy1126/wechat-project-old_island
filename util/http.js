import { config } from "../config"

const tips = {
    1:'抱歉，出现了错误',
    1005:'appkey无效',
    3000:'期刊不存在'
}

class HTTP {
    _show_error(error_code){
        wx.showToast({
            title:tips[error_code],
            icon:'none',
            duration:2000
        })
    }
    
    request (params) {
        wx.request({
            url: config.api_base_url+params.url,
            method: params.method || 'GET',
            data: params.data,
            header: {
                'content-type':'application/json',
                'appkey': config.appkey
            },
            success: res => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success(res)
                } else {
                    // 服务器异常
                    let error_code = res.data.error_code
                    this._show_error(error_code)  
                }
            },
            fail: (err) => {
                // api调用失败
                this._show_error(1)
            }
        })
    }
}

export default HTTP