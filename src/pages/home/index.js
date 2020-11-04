import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem ,Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabBar,AtSearchBar } from 'taro-ui'
import Card from '../../components/Card'
import ShoppingCart from '../../components/ShoppingCart'
import Classification from '../../components/Classification'
import Account from '../../components/Account'
import './index.scss';

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
      value:'',
      barValue:0
    }
    this.handleClickBar = this.handleClickBar.bind(this)
  }


  handleClickBar(value) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      barValue:value
    })
  }
 
  onChange (value) {
    this.setState({
      value: value
    })
  }
 
 

  render() {
    const {barValue} = this.state
    return (
      <View className='page'>
        { barValue == 0 && (
          <View>
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
         {/* 搜索框 */}
         <AtSearchBar
           value={this.state.value}
           onChange={this.onChange.bind(this)}
         />
          {/* 栅栏格 */}
          <Card />
       </View>
        )}
          {/* 购物车*/}
          {barValue === 1 && (
            <ShoppingCart />
          )}
          {/* 分类 */}
          {barValue === 2 && (
            <Classification />
          )}
          {/*我的 */}
          {barValue === 3 && (
            <Account />
          )}
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
          current={barValue}
        />
      </View>
    )
  }
}

export default Home;
