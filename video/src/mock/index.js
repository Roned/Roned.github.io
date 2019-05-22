import Mock from 'mockjs'
import res from './res.json'
Mock.setup({
  timeout: 300, // 设置延迟响应，模拟向后端请求数据
})
Mock.mock('/loadList', 'post', res)
Mock.mock('/loadVideo', 'post', res)

// const Random = Mock.Random
// const produceData = function (opt){
//   let array = []
//   for (let i=0;i<30;i++){

//   }
// }