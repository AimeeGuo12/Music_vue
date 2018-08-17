<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view> <!--子路由挂载-->
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'  // mapMutations对mutation的封装 api中有
import {playlistMixin} from 'common/js/mixin'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({ // 跳转路由  路由：新的层覆盖之前的层
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) { // 规范化list数据
      let map = {
        hot: { // 热门数据
          title: HOT_NAME, // 上面定义 热门 前十条定义为热门的
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) { // 10条热门
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = [] // 热门剩下的
      let hot = [] // 热门的
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => { // a-z排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed // better-scroll父容器高度要固定，子容器内容要撑开才能滚动
    top: 88px
    bottom: 0
    width: 100%
</style>
