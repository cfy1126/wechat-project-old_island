import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
    data: {
        classic: {}
    },
    onLoad(options) {
        const res = classicModel.getLatest((res)=>{
            this.setData({
                classic: res.data
            })
        })
    },
    onLike(event){
        let behavior = event.detail.behavior
        let artID = this.data.classic.id
        let category = this.data.classic.type
        likeModel.like(behavior,artID,category)
    }
})