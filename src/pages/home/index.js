import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabBar } from 'taro-ui'
import Questionaires from '../../components/questionaire'
import './index.scss';
import List from '../../components/list';
import Participate from '../participates'
import image from '../../assets/images/u128.png'

@connect(({ home, common }) => ({
  ...home,
  ...common
}))


class Home extends Component {
  config = {
    navigationBarTitleText: 'flowers',
  };

  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClickBar = this.handleClickBar.bind(this)
  }


  handleClickBar(value) {

    switch (value) {
      case 0:
        Taro.redirectTo({
          url: '/pages/home/index'
        })
        break;
      case 1:
        Taro.redirectTo({
          url: '/pages/templateText/index'
        })
        break;
      case 2:
        Taro.redirectTo({
          url: '/pages/personalCenter/index'
        })
        break;
      default:
        break;
    }
  }
 

 
 

  render() {
    return (
      <View className='page'>
         <Swiper
           className='test-h'
           indicatorColor='#999'
           indicatorActiveColor='#333'
           vertical={false}
           circular
           indicatorDots
           autoplay
          >
            <SwiperItem>
                <Image src='../../assets/images/f1.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
            <SwiperItem>
                <Image src='../../assets/images/f2.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
            <SwiperItem>
                <Image src='../../assets/images/f3.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
          </Swiper>
        {/* 底部bar */}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '购物车', iconType: 'shopping-cart' },
            { title: '分类', iconType: 'list' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClickBar}
          current={this.state.currentBar}
        />
      </View>
    )
  }
}

export default Home;
