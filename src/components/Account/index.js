import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtGrid}  from 'taro-ui'
import './index.scss';

class Account extends Component {
  constructor(props) {
      super(props)
      this.state = {
    
      } 
      this.handledingyue = this.handledingyue.bind(this)
      this.sendMessage = this.sendMessage.bind(this)
      this.getOpenId = this.getOpenId.bind(this)
  }

  getOpenId () {
    var that = this
    var user=wx.getStorageSync('user') || {};  
    var userInfo=wx.getStorageSync('userInfo') || {}; 
    if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){ 
       wx.login({  
       success: function(res){ 
           if(res.code) {
               wx.getUserInfo({
                   success: function (res) {
                       var objz={};
                       objz.avatarUrl=res.userInfo.avatarUrl;
                       objz.nickName=res.userInfo.nickName;
                       //console.log(objz);
                       wx.setStorageSync('userInfo', objz);//存储userInfo
                   }
               });
               var d={
                appid:'wxd6050f45ca5b3c18',
                secret:'66466af294554ee21116344d0cedb7f8'
               };//这里存储了appid、secret、token串  
               var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';  
               wx.request({  
                   url: l,  
                   data: {},  
                   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                   // header: {}, // 设置请求的 header  
                   success: function(res){ 
                       var obj={};
                       obj.openid=res.data.openid;  
                       obj.expires_in=Date.now()+res.data.expires_in;  
                       //console.log(obj);
                       wx.setStorageSync('user', obj);//存储openid  
                   }  
               });
           }else {
               console.log('获取用户登录态失败！' + res.errMsg)
           }          
       }  
     }); 
   } 
  }



   handledingyue (){
    const _this = this
    wx.requestSubscribeMessage({
      tmplIds: ['UKvhQ1woY5ACsj5lou4yEm5wF8jLtvoYPrTB_0LEIYo'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success (res) {
        console.log('已授权接收订阅消息')
        console.log(res)
        _this.sendMessage()
      }
    })
  }

  //getOpenId方法中获取openid
  //session_key: "xmd8sApW3sr/F+GZ3T/EoQ=="
//openid: "oqRjy5HhzKMejHboHXr8adB0Mc94"
  sendMessage () {
      var self = this;
      var opeid = this.props.openid

      Taro.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd6050f45ca5b3c18&secret=66466af294554ee21116344d0cedb7f8',
        data: {
        },
        header: {
          'content-type': 'application/json'
        }
      }).then(res1 => {
        const access_token = res1.data.access_token
        console.log(res1)
        let url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + access_token
     
        let jsonData = {
          access_token: access_token,
          touser: 'oqRjy5HhzKMejHboHXr8adB0Mc94',
          template_id: 'UKvhQ1woY5ACsj5lou4yEm5wF8jLtvoYPrTB_0LEIYo',
          page: "pages/home/index",
          data: {
            "thing6": { "value": "互联网大会科学技术", "color": "#173177" },
            "date5": { "value": "2020年11月4号 20:00", }
          },
          miniprogram_state: 'developer',
        }
        wx.request({
          url: url,
          data:jsonData,
          method: 'POST',
          success (res) {
            console.log("***" + JSON.stringify(res))
            if (res.data.errcode === 0) {
              wx.showToast({
                title: '通知成功',
              })
            }
          },
          fail (err) {
            console.log('request fail ', err);
          },
        })
        })

      
    
  }

  render() {
    return (
        <View className='account-page'>
            <View onClick={this.getOpenId}>
                登录
            </View>
            <View  onClick={this.handledingyue} >
                订阅
            </View>
        </View>
    )
  }
}

export default Account
